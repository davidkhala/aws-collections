set -e
install() {
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
	unzip awscliv2.zip
	sudo ./aws/install
	rm -rf ./aws
	rm awscliv2.zip
}
uninstall() {
	sudo rm /usr/local/bin/aws
	sudo rm /usr/local/bin/aws_completer
	sudo rm -rf /usr/local/aws-cli
}
auth() {
# Verify your credential
	aws sts get-caller-identity
}
$@
