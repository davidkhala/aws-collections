export class AWSClass {
	/**
	 *
	 * @param {string} accessKeyId your AWS access key ID.
	 * @param {string} secretAccessKey your AWS secret access key.
	 * @param {string} region AWS region code
	 */
	constructor({accessKeyId, secretAccessKey, region = 'ap-east-1'} = process.env) {
		// see in https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/modules/credentials.html
		this.credentials = {accessKeyId, secretAccessKey};
		this.region = region;
	}

	buildClient(ClientClass) {
		const {credentials, region} = this;
		this.client = new ClientClass({credentials, region});
		return this.client;
	}

	disconnect() {
		this.client.destroy();
	}
}
