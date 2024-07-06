import S3 from '../s3.js';

const s3 = new S3();
describe('S3', function () {
	this.timeout(0)

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
