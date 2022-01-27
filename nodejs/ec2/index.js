import {EC2} from '@aws-sdk/client-ec2';
import {AWSClass} from '@davidkhala/aws-format';

export class AWSEC2 extends AWSClass {
	constructor() {
		super();
		this.buildClient(EC2);
	}

}