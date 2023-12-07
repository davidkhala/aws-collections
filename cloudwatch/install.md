## For windows 

Prerequisite
- [gpg](https://gpg4win.org/)

```Powershell
# Download
wget https://amazoncloudwatch-agent.s3.amazonaws.com/windows/amd64/latest/amazon-cloudwatch-agent.msi -OutFile "amazon-cloudwatch-agent.msi"
# Install
msiexec /i amazon-cloudwatch-agent.msi
# Configure
# TODO aws config
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-config-wizard"
# Start

Set-ExecutionPolicy RemoteSigned # need privilege
& "C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1" -a fetch-config -m onPremise -s -c file:configuration-file-path

```


