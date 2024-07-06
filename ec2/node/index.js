import {EC2Client, DescribeInstancesCommand, DescribeRegionsCommand} from '@aws-sdk/client-ec2';
import AWSClass from '@davidkhala/aws-format';

export default class EC2 extends AWSClass {
	constructor() {
		super();
		this.as(EC2Client);
	}

	async regions(all) {
		const {Regions} = await this.sendCommand({AllRegions: !!all}, DescribeRegionsCommand);
		return Regions.map(({RegionName}) => RegionName);
	}

	/**
	 *
	 * @param {Object} [filters] https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/modules/describeinstancesrequest.html
	 * @returns {Promise<Instance[]>}
	 */
	async list(filters = {}) {
		const Filters = [
			{
				Name: 'instance-state-name',
				Values: ['pending', 'running', 'shutting-down', 'stopped', 'stopping']
			}
		].concat(Object.entries(filters).map(([Name, Values]) => ({Name, Values})));
		const instances = await this.sendCommand({Filters}, DescribeInstancesCommand);
		return instances.Reservations.map(({Instances}) => {
			return Instances[0];
		});
	}


}