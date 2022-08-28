function Install-CLI {
    Install-Module -name AWSPowerShell.NetCore -Force -Scope CurrentUser
    Import-Module AWSPowerShell.NetCore
}
function Get-Version{
    Get-AWSPowerShellVersion
}
