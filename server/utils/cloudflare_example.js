// ADAPTED FROM https://github.com/cloudflare/workers-aws-template

import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';

// addEventListener('fetch', event => {
// 	event.respondWith(handleRequest(event.request));
// });

async function myCredentialProvider() {
	return {
		// use wrangler secrets to provide these global variables
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	};
}

export async function handleRequest() {

	// The AWS SDK tries to use crypto from off of the window,
	// so we need to trick it into finding it where it expects it
	global.window = {};
	window.crypto = crypto;

	const result = await dynamoExample();

	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'text/plain' },
	});
}

async function dynamoExample() {
    const client = new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentialDefaultProvider: myCredentialProvider,
		...(process.env.ENVIRONMENT === 'development' && { endpoint: 'http://localhost:8000' }),
    });

    // replace with your table name and key as appropriate
    const put = new PutItemCommand({
        TableName: process.env.AWS_DYNAMO_TABLE,
        Item: {
            "greeting": { S: "Hello!" },
            PK: { S: "world" }
        }
    });
    await client.send(put);
    const get = new GetItemCommand({
        TableName: process.env.AWS_DYNAMO_TABLE,
        Key: {
            PK: { S: "world" }
        }
    });
    const results = await client.send(get);
    return results.Item;
}
