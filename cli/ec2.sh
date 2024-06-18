describe-public-key(){
  aws ec2 describe-key-pairs --key-names $1 --include-public-key | jq -r ".KeyPairs[0].PublicKey"
}
create-key-pair(){
  aws ec2 create-key-pair --key-name $1 --key-type rsa --key-format pem --query "KeyMaterial" --output text > "${1}.pem"
  describe-public-key $1
}
$@
