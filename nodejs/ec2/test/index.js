import EC2 from '../index.js';

describe('ec2', function () {
	this.timeout(0);
	it('list', async () => {
		const handler = new EC2();


		const filter = {
			'instance-type': ['t3.xlarge']
		};
		const result = await handler.list(filter);
		console.info(result);
	});
});