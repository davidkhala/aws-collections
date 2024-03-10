# Resilience management
## application
An **application** here is a logical group of AWS resources that you want to operate as a unit. 

It consists of 
- Kubernetes workloads that are managed on Amazon EKS.
- Resource collections
  - up to 5 AWS CloudFormation Stacks
  - up to 20 Terraform state files
  - a predefined application from AWS Service Catalog AppRegistry
  - Use AWS Resource Groups to tag and organize your resources
  - supports cross-region and cross-account resources.

## Drift detection
enable notifications when your application is no longer meeting the RTO,RPO set by your business

## Resiliency score
reflects how closely your application follows AWS resilience and operational recommendations

## price
$15.00 per application / month
- Metering begins once you run the first resilience assessment of the given application, ends after you delete this application

# Resilience testing


