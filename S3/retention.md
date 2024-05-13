

# [Retention Mode](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes)

## Compliance mode
Compliance mode helps ensure that an object version can't be overwritten or deleted for the duration of the retention period.

- a protected object version can't be overwritten or deleted by any user, **including the root user** in your AWS account. 
- its retention mode can't be changed
- its retention period can't be shortened
## Governance mode
Use governance mode to test retention-period settings before creating a compliance-mode retention period.

- users can't overwrite or delete an object version or alter its lock settings **unless they have special permissions**.
- With governance mode, you protect objects against being deleted by most users, but you can still grant some users permission to alter the retention settings or delete the objects if necessary.

