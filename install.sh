set -e

xRayDaemon() {
	if ! xray --version; then
		wget https://s3.dualstack.us-east-2.amazonaws.com/aws-xray-assets.us-east-2/xray-daemon/aws-xray-daemon-3.x.deb
		sudo apt install ./aws-xray-daemon-3.x.deb
		rm aws-xray-daemon-3.x.deb
	fi
	xray
}
cloud9-dependency(){
	sudo apt install -y python
	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	sudo apt -qq install -y nodejs
	sudo apt install -y build-essential
}
$@
