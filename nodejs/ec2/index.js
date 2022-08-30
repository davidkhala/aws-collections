import {EC2Client, DescribeInstancesCommand} from '@aws-sdk/client-ec2';
import AWSClass from '@davidkhala/aws-format';

export default class EC2 extends AWSClass {
	constructor() {
		super();
		this.as(EC2Client);
	}

	async list() {
		const Filters = [
			{
				Name: 'instance-state-name',
				Values: ['pending', 'running', 'shutting-down', 'stopped', 'stopping']
			}
		];
		const instances = await this.sendCommand({Filters}, DescribeInstancesCommand);
		return instances.Reservations.map(({Instances}) => {
			return Instances[0];
		});
	}


}