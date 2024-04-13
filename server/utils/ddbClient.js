// Create service client module using ES6 syntax.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// const config = useRuntimeConfig();

// Create an Amazon DynamoDB service client object.
console.log(`process.env.ENVIRONMENT: ` + process.env.ENVIRONMENT)
console.log(`process.env.AWS_ACCESS_KEY_ID: ` + process.env.AWS_ACCESS_KEY_ID)
const ddbClient = new DynamoDBClient({
    region: process.env.REGION,
    ...(process.env.ENVIRONMENT === 'development' && { endpoint: 'http://localhost:8000' }),
});
export { ddbClient };
