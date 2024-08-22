import { DYNAMO_DB_URL, AWS_REGION } from '../env'


const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

export const execute = async (operation, params) => {
    try {
        return await ddb[operation](params, function (err, data) {
            if (err) {
                console.debug(err);
                throw err;
            } return data;
        }).promise();
    } catch (err) {
        throw new Error(`ERROR: Database operation "${operation}" failed`);
    }
}

export const addToTable = async (tableName, item) => {
    const params = { TableName: tableName, Item: item };
    console.info(`POST: ${JSON.stringify(params)}`)
    await execute('putItem', params)
}

export const queryTable = async (tableName, attrs) => {
    const params = { TableName: tableName, ...attrs };
    const result = await execute('query', params);
    console.info(`QUERY: ${JSON.stringify(result)}`);
    return result;
}

export const updateEntry = async (tableName, id, updateExpression) => {
    console.info(`UPDATE: ${JSON.stringify(updateExpression)} -> ${{ tableName }}.${{ id }}`);
    const params = { TableName: tableName, Key: { "id": id }, UpdateExpression: updateExpression };
    const result = await execute('update', params);
    return result;
}
