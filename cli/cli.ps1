function Install-CLI {
    Install-Module -name AWSPowerShell.NetCore -Force -Scope CurrentUser
    Import-Module AWSPowerShell.NetCore
}
function Get-Version {
    Get-AWSPowerShellVersion
}
function Configure-Profile {
    Initialize-AWSDefaultConfiguration -Region ap-east-1
    Get-S3Bucket
}
