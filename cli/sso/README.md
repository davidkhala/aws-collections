# aws SSO


## Dependency:
- your AWS SSO start URL
  - https://davidkhala.awsapps.com/start 
- the AWS Region that hosts the AWS SSO directory
  - `ap-southeast-1`
- You need to have a least one user within AWS SSO
  - https://ap-southeast-1.console.aws.amazon.com/singlesignon/#/users

## workflow
1. `aws configure sso`
2. login to your aws SSO account in web browser
3.  ```
    CLI default client Region [None]: ap-southeast-1                                                         
    CLI default output format [None]:                                                                        
    CLI profile name [AdministratorAccess-606262941110]: default    
    ```
4. Done
