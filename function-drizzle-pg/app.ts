import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as Sentry from '@sentry/aws-serverless';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
    schema,
    logger: true,
});

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const lambdaHandler = Sentry.wrapHandler(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    for (let i = 0; i < 2; i++) {
        console.log(`Batch ${i}`);
        const numbers = await randomApiCall();
        await db.insert(schema.numbers).values(numbers.map((number) => ({ number })));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        }),
    };
});

// Use `module.exports` to fix
// "TypeError: Cannot redefine property: lambdaHandler"
module.exports = { lambdaHandler };

const randomApiCall = async (): Promise<number[]> => {
    const url = 'https://www.random.org/integers/?num=200&min=1&max=6&col=1&base=10&format=plain&rnd=new';
    const response = await fetch(url);
    return (await response.text()).split('\n').map((line) => Number(line));
};
