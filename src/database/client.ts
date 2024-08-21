import { DYNAMO_DB_URL, AWS_REGION } from '../env'

const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

export const queryTable = async (tableName, params) => {
    const data = await ddb.query({ TableName: tableName, ...params }, function (err, data) {
        if (err) {
            throw err;
        }
    }).promise();
    console.info(`QUERY: ${JSON.stringify(data)}`)
    return data
}

export const addToTable = async (tableName, item) => {
    const params = { TableName: tableName, Item: item };
    console.info(`POST: ${JSON.stringify(params)}`)
    return await ddb.putItem(params, function (err, data) {
        if (err) {
            throw err;
        } return data;
    }).promise();
}


