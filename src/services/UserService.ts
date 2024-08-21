import { USER_TABLE_NAME } from '../env'
import { User } from "../interface";
import { DB } from '../database';

export const getUser = async (uid: string) => {
    return await DB.queryByID(USER_TABLE_NAME, uid) as User;
}

export const addUser = async (name: string) => {
    return await DB.createEntry(USER_TABLE_NAME, { Name: name });
}
