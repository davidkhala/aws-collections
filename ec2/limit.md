# Known issues

## No memory usage in native monitoring
- every other third-party solution does this out of the box. 
- Azure and GCP respective monitoring agents also do this.

## [No free public ip after launched](https://serverfault.com/questions/706560/assign-public-ip-not-elastic-ip-after-instance-launched)
- The instance that you launched without a public IP will stay without one as it is only assignable when you launch the instance. 
- Even having a subnet with auto assign public IP switched on will not assign a public IP to your instance if not specified when you launch

## Not Serial Connect available without Nitro
> **This instance type is not supported for the EC2 serial console.**  
> To connect to the serial port of an instance using the EC2 serial console, the instance must use an instance type that is built on the AWS Nitro System. You can change the instance type to a supported virtualized instance type or bare metal instance type.

Allow list: VM with Nitro System
- https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html?icmpid=docs_ec2_console#nitro-instance-types

Block list but generally used daily
- T2 series
