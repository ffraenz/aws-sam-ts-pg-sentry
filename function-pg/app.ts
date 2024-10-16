import * as Sentry from '@sentry/aws-serverless';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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
    const client = await pool.connect();

    for (let i = 0; i < 2; i++) {
        console.log(`Batch ${i}`);
        const numbers = await randomApiCall();

        const sql =
            'insert into "numbers" ("number") values ' +
            numbers.map((number, index) => '($' + (index + 1) + ')').join(', ');

        console.log('Query: ' + sql);
        await client.query(sql, numbers);
    }

    client.release();
    await pool.end();

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
