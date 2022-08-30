# aws SSO


## Dependency:
- your AWS SSO start URL
  - `https://david-khala.awsapps.com/start`
- the AWS Region that hosts the AWS SSO directory
  - `ap-east-1`
- Map your SSO user/group towards your aws account
  - 

## workflow
1. `aws configure sso`
2. login to your aws SSO account in web browser
3.  ```
    CLI default client Region [None]: ap-east-1                                                         
    CLI default output format [None]:                                                                        
    CLI profile name [AdministratorAccess-606262941110]: default    
    ```
4. Done, you can validate by 
    ```
    aws s3 ls
    ```
If session timeout, refresh by `aws sso login`
