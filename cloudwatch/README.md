# CloudWatch

use case: monitor memoery and disk usage of an instance

## [CloudWatch agent](https://github.com/aws/amazon-cloudwatch-agent/)

## Source
- internal system-level metrics and logs from Amazon EC2 instances or on-premises servers
- custom metrics from your applications or services using the `StatsD` and `collectd` protocols.
  - `collectd` is supported only on Linux servers.
- CloudWatch Application Signals
- Collect traces from OpenTelemetry or X-Ray client SDKs, and send them to X-Ray.

# Known AWS issue
- [Got Home directory: C:\Users\Administrator](https://github.com/aws/amazon-cloudwatch-agent/issues/211)
  - cloudagent doesn't respect current current user and `$env:USERPROFILE`, it is always hardcoded to use `C:\Users\Administrator`
