const region = 'ap-southeast-1';

const S3 = require('../S3');

const s3 = new S3(region);
describe('S3', () => {
	console.info('endpoint', s3.endpoint);
	it('list', async () => {
		const buckets = await s3.listBuckets();
		console.info('list buckets', buckets);
	});
	const newBucketName = 'mcc-test-S3'.toLowerCase();
	it('create bucket', async () => {
		await s3.createBucket(newBucketName);
	});
	it('delete bucket', async () => {
		await s3.deleteBucket(newBucketName);
	});
});
