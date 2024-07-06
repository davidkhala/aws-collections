set -e
install-client(){
  # https://docs.aws.amazon.com/msk/latest/developerguide/create-topic.html
  wget https://archive.apache.org/dist/kafka/${MSK_VERSION}/kafka_2.13-${MSK_VERSION}.tgz
  tar -xzf kafka_2.13-${MSK_VERSION}.tgz
  cd kafka_2.13-${MSK_VERSION}/libs
  wget https://github.com/aws/aws-msk-iam-auth/releases/download/v1.1.1/aws-msk-iam-auth-1.1.1-all.jar
  cd ../bin
  wget https://raw.githubusercontent.com/davidkhala/aws-collections/main/msk/client.properties
}
$@
