set -e
describe-public-key(){
  aws ec2 describe-key-pairs --include-public-key --filters Name=key-name,Values=$1 --query KeyPairs[*].PublicKey --output text
  
}
create-key-pair(){
  aws ec2 create-key-pair --key-name $1 --key-type rsa --key-format pem --query "KeyMaterial" --output text > "${1}.pem"
  describe-public-key $1
  chmod 400 "${1}.pem"
}
$@
