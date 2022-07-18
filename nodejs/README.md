# AWS SDK for JavaScript

## [v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
> The aws-sdk package adds about 40 MB to your application.   
> Replacing varAWS = require("aws-sdk") with const {DynamoDB} = require("@aws-sdk/client-dynamodb") reduces that overhead to about 3 MB.   
> Restricting the import to just the DynamoDB client and ListTablesCommand command reduces the overhead to less than 100 KB.  


## Notes
- AWS Request promisify: use `.promise()` instead of callBack function
- The AWS SDK for JavaScript (v3) will no longer support Node.js v12.21.0 on November 1, 2022. Please upgrade to Node.js 14.x or later.
## Reference
[AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)


