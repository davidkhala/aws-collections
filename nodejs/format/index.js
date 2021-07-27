/**
 *
 * @enum {string}
 */
const regions = {
	Ohio: 'us-east-2',
	Virginia: 'us-east-1',
	California: 'us-west-1',
	Oregon: 'us-west-2',
	CapeTown: 'af-south-1',
	HongKong: 'ap-east-1',
	Mumbai: 'ap-south-1',
	Osaka: 'ap-northeast-3',
	Seoul: 'ap-northeast-2',
	Singapore: 'ap-southeast-1',
	Sydney: 'ap-southeast-2',
	Tokyo: 'ap-northeast-1',
	Central: 'ca-central-1',
	Beijing: 'cn-north-1',
	Ningxia: 'cn-northwest-1',
	Frankfurt: 'eu-central-1',
	Ireland: 'eu-west-1',
	London: 'eu-west-2',
	Milan: 'eu-south-1',
	Paris: 'eu-west-3',
	Stockholm: 'eu-north-1',
	Bahrain: 'me-south-1',
	SaoPaulo: 'sa-east-1',
};


class AWSClass {
	/**
	 *
	 * @param {string} accessKeyId your AWS access key ID.
	 * @param {string} secretAccessKey your AWS secret access key.
	 */
	constructor({accessKeyId, secretAccessKey}) {
		// see in https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-kms/modules/credentials.html
		this.credentials = {accessKeyId, secretAccessKey};
	}
}

module.exports = {
	AWSClass,
	regions,
};
