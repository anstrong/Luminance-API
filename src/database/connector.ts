import { UUID } from '../interface';
import { generateAttributeValues, generateConditionExpressionList, generateTypedParam, generateTypedParams, getAWSType, parseResult } from '../utils/AwsUtils';
import { logger } from '../utils/logger';
import { addToTable, queryTable, updateEntry, scanTable } from './client';
const { v4: uuidv4 } = require("uuid");
/*
export const queryByID = async (tableName, id: string) => {
    let results: any;
    const values = generateTypedParams({ ":id": id })
    try {
        const data = await queryTable(tableName, {
            ExpressionAttributeValues: values,
            KeyConditionExpression: "Id = :id",
        })
        results = data.Items;
    } catch (error) {
        throw new Error(`Unable to retrieve record ${id} from ${tableName}`);
    }
    if (!results) {
        throw new Error(`${id} not found in ${tableName}`);
    }
    return parseResult(results[0]);
}*/

export const scanBy = async (tableName, key) => {
    let results: any;
    const [attr, value] = Object.entries(key)[0]
    const values = generateTypedParams({ ":key": value })
    try {
        const data = await scanTable(tableName, {
            ExpressionAttributeValues: values,
            FilterExpression: `${attr} = :key`,
        })
        results = data.Items;
    } catch (error) {
        throw new Error(`Unable to find any records matching ${value} in ${tableName}`);
    }
    if (!results) {
        throw new Error(`${value} not found in ${tableName}`);
    }
    return parseResult(results[0]);
}

export const queryById = async (tableName: string, id: UUID) => {
    let results: any;
    const values = generateTypedParams({ ":id": id })
    try {
        const data = await queryTable(tableName, {
            ExpressionAttributeValues: values,
            KeyConditionExpression: `Id = :id`,
        })
        results = data.Items;
    } catch (error) {
        throw new Error(`Unable to get record for ${id} in ${tableName}`);
    }
    if (!results) {
        throw new Error(`${id} not found in ${tableName}`);
    }
    return parseResult(results[0]);
}

export const getIdOrCreate = async (tableName, item) => {
    logger.debug(item, 'getIdOrCreate')
    try {
        const user = await scanBy(tableName, item)
        if (!user) {
            throw new Error(`Unable to find any records matching ${item} from ${tableName}`);
        }
        return user['Id']
    } catch (error) {
        return await createEntry(tableName, item)
    }
}

export const createEntry = async (tableName, item, params = {}) => {
    const uid = uuidv4();
    const entry = generateTypedParams({ Id: uid, ...item })
    try {
        await addToTable(tableName, entry, params)
        return uid;
    } catch (error) {
        throw new Error(`Error adding ${JSON.stringify(item)} to ${tableName}`);
    }
}

export const addToEntry = async (tableName, entryKey, attrName, addition, manualAdditionType = '') => {
    const updateExpression = `SET ${attrName} = :val`
    const typedParam = manualAdditionType ? { [manualAdditionType]: addition } : generateTypedParam(addition)
    const params = {
        ExpressionAttributeValues: { ":val": typedParam }
    }
    return await updateEntry(tableName, entryKey, updateExpression, params)
}

export const addToEntryList = async (tableName, entryKey, listName, addition, allowDuplicate = false) => {
    const listPredicate = allowDuplicate ? '#ls' : 'if_not_exists(#ls, :empty)'
    const updateExpression = `SET #ls = list_append(${listPredicate}, :vals)`
    const params = {
        ExpressionAttributeNames: { '#ls': listName },
        ExpressionAttributeValues: { ":vals": { "L": [generateTypedParam(addition)] }, ":empty": { "L": [] } },
    }
    logger.debug(params, 'addToEntryList')
    try {
        return await updateEntry(tableName, entryKey, updateExpression, params)
    } catch (error) {
        throw new Error(`Error adding ${JSON.stringify(addition)} to ${tableName}.${listName}`);
    }

}

export const addToEntrySet = async (tableName, entryKey, setName, addition, setType = 'SS') => {
    const updateExpression = `ADD #s :vals`
    const params = {
        ExpressionAttributeNames: { '#s': setName },
        ExpressionAttributeValues: { ":vals": { [setType]: [addition] } },
    }
    logger.debug(params, 'addToEntrySet')
    try {
        return await updateEntry(tableName, entryKey, updateExpression, params)
    } catch (error) {
        throw new Error(`Error adding ${JSON.stringify(addition)} to ${tableName}.${setName}`);
    }
}
