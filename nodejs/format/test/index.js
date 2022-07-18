import AWSClass from '../index.js';

describe('from cloud9 or instance principal', function () {
	this.timeout(0);
	const store = new AWSClass();

	it('ping with dry-run', async () => {
		await store.ping();

	});
});
