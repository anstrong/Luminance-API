const DYNAMO_DB_URL = "http://localhost:8000"// process.env.DYNAMO_DB_URL;
const AWS_REGION = "fakeRegion"// process.env.AWS_REGION;

const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

export const queryTable = async (tableName, params) => {
    return await ddb.query({ TableName: tableName, ...params }, function (err, data) {
        if (err) {
            throw err;
        }
        console.info("client: ",data)
    }).promise();
}

export const addToTable = async (tableName, item) => {
    console.info({ TableName: tableName, Item: item })
    return await ddb.putItem({ TableName: tableName, Item: item }, function (err, data) {
        if (err) {
            throw err;
        } return data;
    }).promise();
}

export const parseResult = (item) => {
    return Object.fromEntries(Object.entries(item).map(([attr, val], i) => [attr, Object.values(val)[0]]))
}

