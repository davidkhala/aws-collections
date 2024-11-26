workspaces are managed by aws CloudFormation

Provision
- The stack id will be part of s3 bucket name. It should be unique
  - `databricks-workspace-stack-bucket` was occupied
  - Conflict with existing bucket name will lead to workspace provision failure
