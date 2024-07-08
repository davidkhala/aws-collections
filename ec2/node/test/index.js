import EC2 from '../index.js';
import Metadata from '../imds.js'
describe('ec2', function () {
	this.timeout(0);
	const handler = new EC2();
	it('list', async () => {
		const filter = {
			'instance-type': ['t3.xlarge']
		};
		const result = await handler.list(filter);
		console.info(result);
	});
	it('list regions', async () => {
		const resp = await handler.regions();
		console.info(resp);
	});
});
describe('metadata', function (){
	this.timeout(0);
	const metadata = new Metadata()
	it('region info', async ()=>{
		const result= await metadata.region()
		console.info(result);
	})
})