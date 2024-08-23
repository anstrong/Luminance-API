import { USER_TABLE_NAME } from '../env'
import { User } from "../interface";
import { DB } from '../database';
import { getAWSType } from '../utils/AwsUtils';

export const getUser = async (uid: string) => {
    return await DB.queryById(USER_TABLE_NAME, uid) as User;
}

export const addUser = async (name: string) => {
    //return await DB.createEntry(USER_TABLE_NAME, { Name: name });
    return await DB.getIdOrCreate(USER_TABLE_NAME, { FullName: name });
}
/*
export const addToUser = async (uid: string, attrName: string, addition) => {
    const { Name } = await getUser(uid)
    const userKey = { Id: uid, Name }

    return await DB.addToEntryList(USER_TABLE_NAME, userKey, listName, addition);
}*/

export const addToUserList = async (uid: string, listName: string, addition) => {
    const { FullName } = await getUser(uid)
    const userKey = { Id: uid, FullName }

    try {
        return await DB.addToEntryList(USER_TABLE_NAME, userKey, listName, addition);
    } catch (err) {
        try {
            await DB.addToEntry(USER_TABLE_NAME, userKey, listName, [])
            await DB.addToEntryList(USER_TABLE_NAME, userKey, listName, addition);
            return;
        } catch (error) {
            throw error;
        }
    }

}

export const addToUserSet = async (uid: string, setName: string, addition) => {
    const { FullName } = await getUser(uid)
    const userKey = { Id: uid, FullName }
    const setType = `S${getAWSType(addition)}`
    try {
        return await DB.addToEntrySet(USER_TABLE_NAME, userKey, setName, addition, setType);
    } catch (err) {
        try {
            await DB.addToEntry(USER_TABLE_NAME, userKey, setName, [], setType)
            await DB.addToEntrySet(USER_TABLE_NAME, userKey, setName, addition, setType);
        } catch (error) {
            throw error;
        }
    } finally {
        return FullName;
    }

}
