import { User } from "../interface";
import { addToTable, queryTable, parseResult } from './client';
const { v4: uuidv4 } = require("uuid");
const USER_TABLE_NAME = "Users"//process.env.USER_TABLE_NAME

const MOCK_USER = { Name: 'Charlie Brown', Words: ['some-words'], Associations: {} }

export const getUser = async (uid: string) => {
    let user: any;
    try {
        const data = await queryTable(USER_TABLE_NAME, {
            ExpressionAttributeValues: {
                ":id": { S: uid },
            },
            KeyConditionExpression: "Id = :id",
        })
        user = parseResult(data.Items[0]);
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
    try {
        await addToTable(USER_TABLE_NAME, {
            Id: { S: uid },
            Name: { S: name }
        })
        return uid;
    } catch (error) {
        console.debug(error);
        throw new Error(`Error adding new user ${name}`);
    }
}
