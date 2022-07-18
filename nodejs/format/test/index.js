import AWSClass from '../index.js';
import {EC2Client} from '@aws-sdk/client-ec2';

describe('ping', function () {
	this.timeout(0);
	const accessKeyId = 'AKIAY2KAWKW3ALRO7673';
	const {secretAccessKey} = process.env;
	const store = new AWSClass({accessKeyId, secretAccessKey});
	store.as(EC2Client);

	it('ping with dryrun', async () => {
		await store.ping();


	});
});
