import { generateTypedParams, parseResult } from '../utils/AwsUtils';
import { addToTable, queryTable } from './client';
const { v4: uuidv4 } = require("uuid");

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
        console.error(error);
        throw new Error(`Unable to retrieve record ${id} from ${tableName}`);
    } finally {
        if (!results) {
            throw new Error(`${id} not found in ${tableName}`);
        }
        return parseResult(results[0]);
    }
}

export const createEntry = async (tableName, item) => {
    const uid = uuidv4();
    const params = generateTypedParams({ Id: uid, ...item })
    try {
        await addToTable(tableName, params)
        return uid;
    } catch (error) {
        console.debug(error);
        throw new Error(`Error adding to ${JSON.stringify(item)} ${tableName}`);
    }
}
