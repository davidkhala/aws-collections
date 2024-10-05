set -e
run() {
    # Default with options: -inMemory
    # Default without options: -sharedDb
    docker run -d -p 8000:8000 --name=dynamodb-local amazon/dynamodb-local
}

run-advanced() {
    local localPath=${1:-~/dynamodb-local}
    local baseName=$(basename $1)
    docker run -d -p 8000:8000 --volume="${localPath}:/home/dynamodblocal/${baseName}" --name=dynamodb-local amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /home/dynamodblocal/${baseName}
}

$@
