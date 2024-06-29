
login(){
  local clustername=$1
  aws eks update-kubeconfig --name $clustername
}
$@
