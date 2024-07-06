import {DynamoManager} from "../manage.js";

describe('docker', function () {
	this.timeout(0)
	const tableName = 'test';
	const dynamoManager = new DynamoManager(tableName);
	dynamoManager.localhost()
	const sample = [
		{name: 'a', type: 'string', keyType: 'partition'},
		{name: 'b', type: 'number', keyType: 'sort'}
	];

	it('create', async () => {
		await dynamoManager.createSync(sample);
	});
	it('get', async () => {
		const data = await dynamoManager.get();
		console.debug(data)
	});
	it('delete', async () => {
		await dynamoManager.delete()
	});

});