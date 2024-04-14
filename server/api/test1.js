import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

export default defineEventHandler(async (event) => {
    const put = new PutItemCommand({
        TableName: process.env.AWS_DYNAMO_TABLE,
        Item: {
            "greeting": { S: "Hello!" },
            PK: { S: "world" }
        }
    });
    await ddbClient.send(put);
    const get = new GetItemCommand({
        TableName: process.env.AWS_DYNAMO_TABLE,
        Key: {
            PK: { S: "world" }
        }
    });
    const results = await ddbClient.send(get);
    return results.Item;
});