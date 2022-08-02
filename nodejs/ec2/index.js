import {EC2 as EC2Client} from '@aws-sdk/client-ec2';
import {AWSClass} from '@davidkhala/aws-format';

export default class EC2 extends AWSClass {
	constructor() {
		super();
		this.as(EC2Client);
	}

}