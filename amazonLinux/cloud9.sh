install-dependency(){
  sudo dnf install -y nodejs
  sudo dnf install -y python3-pip
  sudo dnf install -y sqlite

}
$@
