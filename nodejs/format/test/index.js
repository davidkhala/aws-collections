import AWSClass from '../index.js';

describe('base class', function () {
	this.timeout(0);
	const instance = new AWSClass();

	it('ping', async () => {
		await instance.ping();
	});
});
