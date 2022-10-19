import {DynamoDBClient, CreateTableCommand, DeleteTableCommand, DescribeTableCommand} from '@aws-sdk/client-dynamodb';
import {removeUndefinedValues} from '@davidkhala/light/syntax.js'
import AWSClass from '@davidkhala/aws-format/index.js';

export class DynamoManager extends AWSClass {
	constructor(TableName) {
		super();
		this.as(DynamoDBClient);
		this.TableName = TableName;
	}

	async create(attributes, provisioned, withDAX) {
		const {TableName} = this;

		const params = {
			BillingMode: provisioned ? 'PROVISIONED' : 'PAY_PER_REQUEST',
			AttributeDefinitions: attributes.map(({name, type}) => {
				let AttributeType = 'B';// Binary as default
				switch (type) {
					case 'number' || 'bigint':
						AttributeType = 'N';
						break;
					case 'string':
						AttributeType = 'S';
				}
				return {
					AttributeName: name,
					AttributeType
				};
			}),
			KeySchema: attributes.filter(({keyType}) => !!keyType).map(({name, keyType}) => {
				switch (keyType) {
					case 'partition':
						keyType = 'HASH';
						break;
					case 'sort':
						keyType = 'RANGE';

				}
				return {
					AttributeName: name,
					KeyType: keyType
				};
			}),
			TableName,

		};
		if (provisioned) {
			const {read, write} = provisioned;
			params.ProvisionedThroughput = {
				ReadCapacityUnits: parseInt(read),
				WriteCapacityUnits: parseInt(write)
			};
		}
		if (withDAX) {
			params.StreamSpecification = {StreamEnabled: true};
		}
		const data = await this.sendCommand(params, CreateTableCommand);
		return data;
	}

	async delete() {
		const {TableName} = this;
		await this.sendCommand({TableName}, DeleteTableCommand);
	}

	async get() {
		const {TableName} = this;
		const data = await this.sendCommand({TableName}, DescribeTableCommand);
		return removeUndefinedValues(data, true)
	}
}
