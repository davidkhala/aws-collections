describe-public-key(){
  aws ec2 describe-key-pairs --key-names $1 --include-public-key | jq -r ".KeyPairs[0].PublicKey"
}
$@
