## For windows 

Prerequisite
- [gpg](https://gpg4win.org/)
  - https://files.gpg4win.org/gpg4win-4.2.0.exe
```Powershell

# Install
msiexec /i https://amazoncloudwatch-agent.s3.amazonaws.com/windows/amd64/latest/amazon-cloudwatch-agent.msi
# Configure
# TODO aws config
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-config-wizard"
# Start

Set-ExecutionPolicy RemoteSigned # need privilege
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1" -a fetch-config -m onPremise -s -c file:configuration-file-path

```


