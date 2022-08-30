setup() {
  aws configure sso
}
refresh() {
  aws sso login
}
$@
