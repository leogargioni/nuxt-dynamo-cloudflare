import { QueryCommand } from "@aws-sdk/client-dynamodb";

export default defineEventHandler(async (event) => {
    let params = {
        TableName: process.env.AWS_DYNAMO_TABLE,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: {
            ":pk": { S: "GROUP" },
        },
    };
    let data = await ddbClient.send(new QueryCommand(params));

    return data
});