region=${region:-ap-southeast-1}
start-model(){
  local modelARN=$1
  aws rekognition start-project-version --project-version-arn "$modelARN" --min-inference-units 1 --region "$region"
}
stop-model(){
  local modelARN=$1 # get from Custom Labels/Projects/:projectName/Models/:modelName -> Tab "Use model" -> Section "Use your model"
  aws rekognition stop-project-version --project-version-arn "$modelARN" --region "$region"
}
analyze-image(){
#   TODO what is the bucket name sample and object name format
  local modelARN=$1
  aws rekognition detect-custom-labels --project-version-arn "$modelARN" --image '{"S3Object": {"Bucket": "MY_BUCKET","Name": "PATH_TO_MY_IMAGE"}}'--region "$region"
}

$@