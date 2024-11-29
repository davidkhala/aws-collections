
- AWS Databricks do **not** have default **Workspace catalog** provision

# Provision

metastore management
- AWS dont' default enable Unity Catalog
- Both provision methods will not automatically provision metastore
- Existing metastore is required for Unity Catalog enablement

## Quickstart (Recommended)

- powered by aws CloudFormation template

Provision

- The stack id will be part of s3 bucket name. It should be unique
  - `databricks-workspace-stack-bucket` was occupied
  - Conflict with existing bucket name will lead to workspace provision failure
- This special type of CloudFormation stack cannot be updated upon failure status `ROLLBACK_COMPLETE`
  - You can only delete it
- Quickstart does not default enable Unity Catalog nor create metastore
  

Terminate

- Delete the CloudFormation stack to release aws resources (e.g. S3, VPC endpoint, IAM)
  - It will not be deleted along with databricks workspace delete
  - Delete pre-requisite
    - Empty bucket `{stack-name}-bucket`
- Delete the linkage to aws, resented in Account console > `Cloud resources` in left panel
  - It will not be deleted along with databricks workspace nor CloudFormation stack delete
  - It locates in `Credential configuration` and `Storage configuration` tabs

## Manual provision

More pre-requisite

- Credential configuration
- Storage configuration
