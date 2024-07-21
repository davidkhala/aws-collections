# Known issues

## No memory usage in native monitoring
- every other third-party solution does this out of the box. 
- Azure and GCP respective monitoring agents also do this.

## [No free public ip after launched](https://serverfault.com/questions/706560/assign-public-ip-not-elastic-ip-after-instance-launched)
- The instance that you launched without a public IP will stay without one as it is only assignable when you launch the instance. 
- Even having a subnet with auto assign public IP switched on will not assign a public IP to your instance if not specified when you launch

## Not Serial Connect available without Nitro
