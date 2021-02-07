const {AWSClass} = require('./');

class S3 extends AWSClass {
	constructor(region, apiVersion = '2006-03-01') {
		super();
		this.updateRegion(region);
		this.region = region;
		this.s3 = new this.AWS.S3({apiVersion});
		this.endpoint = this.s3.endpoint;
	}

	/**
	 * Create a bucket in this AWS Region.
	 * @param Bucket
	 * @return {Promise<PromiseResult<S3.CreateBucketOutput, AWSError>>}
	 */
	async createBucket(Bucket) {
		const opts = {
			Bucket,
			CreateBucketConfiguration: {
				LocationConstraint: this.region
			}
		};
		return this.s3.createBucket(opts).promise();
	}

	/**
	 *
	 * @param Bucket
	 * @return {Promise<PromiseResult<{}, AWSError>>}
	 */
	async deleteBucket(Bucket) {
		return this.s3.deleteBucket({Bucket}).promise();
	}

	/**
	 * List all of your available buckets in this AWS Region.
	 * @return {Promise<PromiseResult<S3.ListBucketsOutput, AWSError>>}
	 */
	async listBuckets() {
		return this.s3.listBuckets().promise();
	}


	/**
	 * TODO what is its return
	 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
	 * @param {string} Bucket
	 * @param {string} Key
	 * @param {byte[]|string|ReadableStream|Blob} data Buffer, Typed Array, Blob, String, ReadableStream
	 * @returns {Promise<ManagedUpload.SendData>}
	 */
	async upload(Bucket, Key, data) {
		return this.s3.upload({Bucket, Key, Body: data}).promise();
	}
}

module.exports = S3;
