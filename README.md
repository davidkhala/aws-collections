# khala-aws

## disc usage
Total: 41M
- aws-sdk:  41M

## Documents
- aws-sdk API reference: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/

## Notes
- AWS Request promisify: use `.promise()` instead of callBack function
- apply IAM role(with 'AdministratorAccess') to EC2, otherwise `CredentialsError: Missing credentials in config`
    - Console -> Service: EC2 -> select an instance -> `Actions` -- `Instance Settings` -- `Attach/Replace IAM Role`

### AWS S3
- s3 bucket name only accept lowercase

### AWS CloudWatch
- [statsD support](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-custom-metrics-statsd.html)


### AWS SQS
- If you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.
    - `AWS.SimpleQueueService.PurgeQueueInProgress: Only one PurgeQueue operation on ${QueueName} is allowed every 60 seconds.`
- `QueueUrl` is not `QueueName`
    - sample `QueueName`: topicA
    - sample `QueueUrl`: https://sqs.ap-southeast-1.amazonaws.com/616879594671/topicA
    - aws provide `sqs.getQueueUrl` to get QueueUrl from QueueName  
- no way to subscribe listener,only polling to receiveMessage is supported [pull] like kafka
- [message lag] If the number of messages in the queue is extremely small, you might not receive any messages in a particular ReceiveMessage response. If this happens, repeat the request.
### AWS MQ
- Amazon MQ is a managed message broker service for Apache ActiveMQ, provides support for ActiveMQ versions 5.15.0, 5.15.6, 5.15.8, and 5.15.9.

## TODO
- when migrate to use mocha.js authentication is required. 
