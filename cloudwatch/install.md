## For windows 

Prerequisite
- [gpg](https://gpg4win.org/)
  - https://files.gpg4win.org/gpg4win-4.2.0.exe
```Powershell

# Install
msiexec /i https://amazoncloudwatch-agent.s3.amazonaws.com/windows/amd64/latest/amazon-cloudwatch-agent.msi
# Configure, the output config.json is stored in current directory
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-config-wizard"
# Start

Set-ExecutionPolicy RemoteSigned # need privilege
# TODO:  Please make sure the credentials and region set correctly on your hosts.
# Refer to http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1" -a fetch-config -m onPremise -s -c file:config.json

```


