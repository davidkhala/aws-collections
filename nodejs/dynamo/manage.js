import {DynamoDBClient, CreateTableCommand, DeleteTableCommand, DescribeTableCommand} from '@aws-sdk/client-dynamodb';
import AWSClass from '@davidkhala/aws-format/index.js';
import assert from "assert";

export class DynamoManager extends AWSClass {
    constructor(TableName, logger = console) {
        super();
        this.as(DynamoDBClient);
        this.TableName = TableName;
        this.logger = logger
    }

    // switch connection to amazon/dynamodb-local
    localhost(port = 8000) {
        this.endpoint = `http://localhost:${port}`
        this.as(DynamoDBClient)
    }

    async create(attributes, provisioned, withDAX) {
        const {TableName} = this;

        const params = {
            BillingMode: provisioned ? 'PROVISIONED' : 'PAY_PER_REQUEST',
            AttributeDefinitions: attributes.map(({name, type}) => {
                let AttributeType = 'B';// Binary as default
                switch (type) {
                    case 'number':
                    case 'bigint':
                        AttributeType = 'N';
                        break;
                    case 'string':
                        AttributeType = 'S';
                        break;
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
        this.debug && this.logger.debug(data['$metadata'])
        return data.TableDescription;
    }

    async createSync(...options) {
        await this.create(...options)
        const waitUntilReady = async () => {
            const {TableStatus} = await this.get();
            if (TableStatus === 'CREATING') {
                return await waitUntilReady()
            } else {
                return TableStatus
            }
        }
        const nextStatus = await waitUntilReady()
        assert.equal(nextStatus, 'ACTIVE')
    }

    async delete() {
        const {TableName} = this;
        await this.sendCommand({TableName}, DeleteTableCommand);
    }

    async get() {
        const {TableName} = this;
        const data = await this.sendCommand({TableName}, DescribeTableCommand);
        this.debug && this.logger.debug(data['$metadata'])
        return data.Table
    }
}
