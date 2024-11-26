
# Workspace manage

## Quickstart provision

- powered by aws CloudFormation template
- The stack id will be part of s3 bucket name. It should be unique
  - `databricks-workspace-stack-bucket` was occupied
  - Conflict with existing bucket name will lead to workspace provision failure
- This special type of CloudFormation stack cannot be updated upon failure status `ROLLBACK_COMPLETE`
  - You can only delete it
- Quickstart does not default enable Unity Catalog nor create metastore
