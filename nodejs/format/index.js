import {STSClient, GetCallerIdentityCommand} from '@aws-sdk/client-sts';

export default class AWSClass {
	/**
	 *
	 * @param {string} accessKeyId your AWS access key ID.
	 * @param {string} secretAccessKey your AWS secret access key.
	 * @param {string} [region] AWS region code
	 * @param [logger]
	 */
	constructor({accessKeyId, secretAccessKey, region = 'ap-east-1'} = process.env, logger) {
		// see in https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/modules/credentials.html
		if (accessKeyId && secretAccessKey) {
			this.credentials = {accessKeyId, secretAccessKey};
		}

		this.region = region;
		this.logger = logger;
	}

	as(ClientClass) {
		if (this.client) {
			this.disconnect();
		}
		this.client = new ClientClass(this);
		return this.client;
	}

	async sendCommand(options, CommandType) {
		const command = new CommandType(options);
		return await this.client.send(command);
	}

	async ping() {
		const stsClient = new STSClient(this);
		const command = new GetCallerIdentityCommand({});
		const {UserId, Account, Arn} = await stsClient.send(command);
		stsClient.destroy();
		return {UserId, Account, Arn};
	}

	disconnect() {
		this.client.destroy();
		delete this.client;
	}
}
