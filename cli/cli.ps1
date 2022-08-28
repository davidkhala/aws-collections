function Install-CLI {
    Install-Module -name AWSPowerShell.NetCore -Force -Scope CurrentUser
    Import-Module AWSPowerShell.NetCore
}
function Get-Version {
    Get-AWSPowerShellVersion
}
function Profile-Login {
    # TODO
    param (
        [Parameter(Position = 0, Mandatory)]
        [string]$Access,
        [Parameter(Position = 1, Mandatory)]
        [string]$Secret
    )
    Set-DefaultAWSRegion -Region ap-east-1
    Set-AWSCredential -AccessKey $Access -SecretKey $Secret
    Get-S3Bucket
}
function Session-Login {
    # The credential profile that results from running this command wound not be stored locally
    Initialize-AWSDefaultConfiguration -Region ap-east-1
    Get-S3Bucket
}
