import {DynamoManager} from '../manage.js';

describe('DynamoManager', function () {
	const tableName = 'test';
	const dynamoManager = new DynamoManager(tableName);
	const sample = [
		{name: 'a', type: 'string', keyType: 'partition'},
		{name: 'b', type: 'number', keyType: 'sort'}
	];

	it('create', async () => {
		await dynamoManager.create(sample);
	});
	it('get', async () => {
		const data = await dynamoManager.get();
		console.debug(data)
	});
	it('delete', async () => {
		await dynamoManager.delete()
	});

});
