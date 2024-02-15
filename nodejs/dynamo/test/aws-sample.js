import {DynamoDBClient, DescribeTableCommand, CreateTableCommand, DeleteTableCommand} from '@aws-sdk/client-dynamodb';
import assert from 'assert';

describe('native way', function () {
	this.timeout(0);
	const {accessKeyId, secretAccessKey,} = process.env;
	const client = new DynamoDBClient({
		credentials: {accessKeyId, secretAccessKey},
		region: 'ap-east-1'
	});
	const TableName = 'TEST_TABLE';
	it('create table', async () => {

		// Set the parameters
		const params = {
			AttributeDefinitions: [
				{
					AttributeName: 'Season', // ATTRIBUTE_NAME_1
					AttributeType: 'N', // ATTRIBUTE_TYPE
				},
				{
					AttributeName: 'Episode', // ATTRIBUTE_NAME_2
					AttributeType: 'N', // ATTRIBUTE_TYPE
				},
			],
			KeySchema: [
				{
					AttributeName: 'Season', // ATTRIBUTE_NAME_1
					KeyType: 'HASH',
				},
				{
					AttributeName: 'Episode', // ATTRIBUTE_NAME_2
					KeyType: 'RANGE',
				},
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
			TableName, // TABLE_NAME
			StreamSpecification: {
				StreamEnabled: false,
			},
		};
		const data = await client.send(new CreateTableCommand(params));
		console.log('Table Created', data.TableDescription);
	});
	it('get table', async () => {
		const cmd = new DescribeTableCommand({TableName});
		const result = await client.send(cmd);
		console.debug(result.Table);

	});
	it('delete table', async () => {
		// wait until
		const cmd = new DescribeTableCommand({TableName});

		async function waitUntilReady() {
			const {Table: {TableStatus}} = await client.send(cmd);
			if (TableStatus === 'CREATING') {
				return await waitUntilReady();
			} else {
				assert.equal(TableStatus, 'ACTIVE');
				return TableStatus;
			}
		}

		await waitUntilReady();

		await client.send(new DeleteTableCommand({TableName}));
	});
});
