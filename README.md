# Non-working example of API built on Nuxt and deployed on Cloudflare trying to call DynamoDB
For more info check https://github.com/unjs/nitro/issues/1882


# Setup
To test, you'll need to have a table called "Example" in DynamoDB, I've deployed the [local version](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) of DynamoDB to test it locally in `development` environment. To create the "Example" table in local DynamoDB run the following command:

```
aws dynamodb create-table --table-name Example --attribute-definitions AttributeName=PK,AttributeType=S --key-schema AttributeName=PK,KeyType=HASH  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --table-class STANDARD --region=sa-east-1 --endpoint-url http://localhost:8000/
```