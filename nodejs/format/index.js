import {STSClient, GetCallerIdentityCommand} from '@aws-sdk/client-sts';

export default class AWSClass {
	/**
     *
     * @param {string} accessKeyId your AWS access key ID.
     * @param {string} secretAccessKey your AWS secret access key.
     * @param {string} [region] AWS region code
     */
	constructor({accessKeyId, secretAccessKey, region = 'ap-east-1'} = process.env) {
		// see in https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/modules/credentials.html
		if (accessKeyId && secretAccessKey) {
			this.credentials = {accessKeyId, secretAccessKey};
		}

		this.region = region;
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
		this.as(STSClient);
		const {UserId, Account, Arn} = await this.sendCommand({}, GetCallerIdentityCommand);
		return {UserId, Account, Arn};
	}

	disconnect() {
		this.client.destroy();
		delete this.client;
	}
}
