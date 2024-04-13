import { QueryCommand } from "@aws-sdk/client-dynamodb";

export async function handleTest1Request() {
    let params = {
        TableName: process.env.AWS_DYNAMO_TABLE,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: {
            ":pk": { S: "GROUP" },
        },
    };
    const test1data = await ddbClient.send(new QueryCommand(params));
    return test1data
}