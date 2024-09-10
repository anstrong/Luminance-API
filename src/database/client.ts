import { generateTypedParam, generateTypedParams } from '../utils/AwsUtils';
import { logger } from '../utils/logger';
import connection from './connection';

export const addToTable = async (tableName, item, additionalParams = {}) => {
  const params = { TableName: tableName, Item: item, ...additionalParams };
  await connection.execute('putItem', params, 'params')
  return item
}

export const queryTable = async (tableName, attrs) => {
  logger.debug(attrs, 'queryTable')
  const params = { TableName: tableName, ...attrs };
  const result = await connection.execute('query', params, 'result');
  return result;
}

export const scanTable = async (tableName, attrs) => {
  logger.debug(attrs, 'scanTable')
  const params = { TableName: tableName, ...attrs };
  const result = await connection.execute('scan', params, 'result');
  return result;
}

export const updateEntry = async (tableName, keyValues, updateExpression, additionalParams = {}) => {
  const params = { TableName: tableName, Key: generateTypedParams(keyValues), UpdateExpression: updateExpression, ...additionalParams };
  await connection.execute('updateItem', params, 'params');
  return keyValues
}
