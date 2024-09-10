import { DYNAMO_DB_URL, AWS_REGION } from '../env'
import { generateTypedParam, generateTypedParams } from '../utils/AwsUtils';
import { logger } from '../utils/logger';

const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

export const execute = async (operation, params, logMode = 'result') => {
  if (logMode === 'params' || logMode === 'both') {
    logger.info(operation, params);
  }

  try {
    const result = await ddb[operation](params, function (err, data) {
      return data;
    }).promise();

    if (logMode === 'result' || logMode === 'both') {
      logger.info(operation, result);
    }

    return result;
  } catch (err) {
    logger.debug(err, 'dynamo')
    throw new Error(`Database operation "${operation}" failed`);
  }
}

export const addToTable = async (tableName, item, additionalParams = {}) => {
  const params = { TableName: tableName, Item: item, ...additionalParams };
  await execute('putItem', params, 'params')
  return item
}

export const queryTable = async (tableName, attrs) => {
  logger.debug(attrs, 'queryTable')
  const params = { TableName: tableName, ...attrs };
  const result = await execute('query', params, 'result');
  return result;
}

export const scanTable = async (tableName, attrs) => {
  logger.debug(attrs, 'scanTable')
  const params = { TableName: tableName, ...attrs };
  const result = await execute('scan', params, 'result');
  return result;
}

export const updateEntry = async (tableName, keyValues, updateExpression, additionalParams = {}) => {
  const params = { TableName: tableName, Key: generateTypedParams(keyValues), UpdateExpression: updateExpression, ...additionalParams };
  await execute('updateItem', params, 'params');
  return keyValues
}
