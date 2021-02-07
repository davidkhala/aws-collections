/**
 *
 * @type {AWSRegion[]} regions
 */
exports.regions = [
	'us-east-2',
	'us-east-1',
	'us-west-1',
	'us-west-2',
	'ap-south-1',
	'ap-northeast-3',
	'ap-northeast-2',
	'ap-southeast-1',// Asia Pacific (Singapore)
	'ap-southeast-2',
	'ap-northeast-1',
	'ca-central-1',
	'cn-north-1',
	'cn-northwest-1',
	'eu-central-1',
	'eu-west-1',
	'eu-west-2',
	'eu-west-3',
	'eu-north-1',
	'sa-east-1'
];
class AWSClass {
	constructor() {
		this.AWS = require('aws-sdk');
	}

	updateRegion(region) {
		this.AWS.config.update({region});
	}
}

exports.AWSClass = AWSClass;
