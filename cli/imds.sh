# instance metadata
list(){
   curl http://169.254.169.254/latest/meta-data/
}
get-ip() {
  # private ip
  curl http://169.254.169.254/latest/meta-data/local-ipv4
}
get-token(){
  export TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
  echo "X-aws-ec2-metadata-token: $TOKEN" # header for curl
}
$@
