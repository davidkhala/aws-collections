import {DynamoDBClient, DescribeTableCommand, CreateTableCommand, DeleteTableCommand} from '@aws-sdk/client-dynamodb';


describe('native way', function () {
	this.timeout(0);
	const region = 'ap-east-1';
	const client = new DynamoDBClient({region});
	const TableName = 'TEST_TABLE';
	it('create table', async () => {

		// Set the parameters
		const params = {
			AttributeDefinitions: [
				{
					AttributeName: 'Season', //ATTRIBUTE_NAME_1
					AttributeType: 'N', //ATTRIBUTE_TYPE
				},
				{
					AttributeName: 'Episode', //ATTRIBUTE_NAME_2
					AttributeType: 'N', //ATTRIBUTE_TYPE
				},
			],
			KeySchema: [
				{
					AttributeName: 'Season', //ATTRIBUTE_NAME_1
					KeyType: 'HASH',
				},
				{
					AttributeName: 'Episode', //ATTRIBUTE_NAME_2
					KeyType: 'RANGE',
				},
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 1,
				WriteCapacityUnits: 1,
			},
			TableName, //TABLE_NAME
			StreamSpecification: {
				StreamEnabled: false,
			},
		};
		const data = await client.send(new CreateTableCommand(params));
		console.log('Table Created', data);
	});
	it('get table', async () => {
		const cmd = new DescribeTableCommand({TableName});
		const result = await client.send(cmd);
		console.debug(result);
	});
	it('delete table', async () => {

		await client.send(new DeleteTableCommand({TableName}));
	});
});
