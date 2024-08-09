import Metadata from '../imds.js';

describe('metadata', function (){
	this.timeout(0);
	const metadata = new Metadata()
	it('region info', async ()=>{
		console.info(await metadata.request());
		console.info(await metadata.region());
	})
})