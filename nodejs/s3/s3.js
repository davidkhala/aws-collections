import AWSClass from '@davidkhala/aws-format/index.js';
import {S3} from '@aws-sdk/client-s3';

export default class S3Client extends AWSClass {
	constructor() {
		super();
		this.as(S3);
	}

	async createBucket(Bucket) {
		const opts = {
			Bucket,
		};
		return this.client.createBucket(opts);
	}

	/**
	 *
	 * @param Bucket
	 * @return {Promise<PromiseResult<{}, AWSError>>}
	 */
	async deleteBucket(Bucket) {
		return this.client.deleteBucket({Bucket});
	}

	/**
	 * List all of your available buckets in this AWS Region.
	 */
	async listBuckets() {
		return this.client.listBuckets({});
	}


	/**
	 * TODO what is its return
	 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
	 * @param {string} Bucket
	 * @param {string} Key
	 * @param {byte[]|string|ReadableStream|Blob} data Buffer, Typed Array, Blob, String, ReadableStream
	 */
	async upload(Bucket, Key, data) {
		return this.client.upload({Bucket, Key, Body: data});
	}
}


