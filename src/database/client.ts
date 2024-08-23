import { DYNAMO_DB_URL, AWS_REGION } from '../env'
import { generateTypedParam, generateTypedParams } from '../utils/AwsUtils';


const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

export const execute = async (operation, params) => {
  try {
    return await ddb[operation](params, function (err, data) {
      return data;
    }).promise();
  } catch (err) {
    console.debug(err)
    throw new Error(`Database operation "${operation}" failed`);
  }
}

export const addToTable = async (tableName, item, additionalParams = {}) => {
  const params = { TableName: tableName, Item: item, ...additionalParams };
  console.info(`POST: ${JSON.stringify(params)}`)
  await execute('putItem', params)
  return item
}

export const queryTable = async (tableName, attrs) => {
  console.info(attrs)
  const params = { TableName: tableName, ...attrs };
  const result = await execute('query', params);
  console.info(`QUERY: ${JSON.stringify(result)}`);
  return result;
}

export const scanTable = async (tableName, attrs) => {
  console.info(attrs)
  const params = { TableName: tableName, ...attrs };
  const result = await execute('scan', params);
  console.info(`SCAN: ${JSON.stringify(result)}`);
  return result;
}

export const updateEntry = async (tableName, keyValues, updateExpression, additionalParams = {}) => {
  const params = { TableName: tableName, Key: generateTypedParams(keyValues), UpdateExpression: updateExpression, ...additionalParams };
  console.info(`UPDATE: ${JSON.stringify(params)}`);
  await execute('updateItem', params);
  return keyValues
}
