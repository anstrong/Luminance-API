import { User } from "../interface";
import { generateTypedParams, parseResult } from "../utils/AwsUtils";
import { addToTable, queryTable } from './client';
const { v4: uuidv4 } = require("uuid");
import { USER_TABLE_NAME } from '../env'

export const getUser = async (uid: string) => {
    let user: User;
    const values = generateTypedParams({":id": uid})
    try {
        const data = await queryTable(USER_TABLE_NAME, {
            ExpressionAttributeValues: values,
            KeyConditionExpression: "Id = :id",
        })
        user = parseResult(data.Items[0]) as User;
    } catch (error) {
        console.error(error);
        throw new Error(`Unable to retrieve user ${uid}`);
    } finally {
        if (!user) {
            throw new Error(`User ${uid} not found`);
        }
        return user;
    }
}

export const addUser = async (name: string) => {
    const uid = uuidv4();
    const params = generateTypedParams({Id: uid, Name: name})
    try {
        await addToTable(USER_TABLE_NAME, params)
        return uid;
    } catch (error) {
        console.debug(error);
        throw new Error(`Error adding new user ${name}`);
    }
}
