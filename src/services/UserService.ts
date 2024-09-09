import { USER_TABLE_NAME } from '../env'
import { User, UserKey, UUID } from "../interface";
import { DB } from '../database';
import { getAWSType } from '../utils/AwsUtils';

/**
 * Get user record from database
 *
 * @param {UUID} uid User id
 * @return {User} User record
 */
export const getUser = async (uid: UUID): Promise<User>=> {
    return await DB.queryById(USER_TABLE_NAME, uid) as User;
}

/**
 * Add new user to database
 *
 * @param {string} name Full name of new user
 * @return {UUID} 
 */
export const addUser = async (name: string): Promise<UUID> => {
    return await DB.getIdOrCreate(USER_TABLE_NAME, { FullName: name });
}

/**
  * Get key to query user in database
 *
 * @param {UUID} uid User id
 * @return {UserKey} User key
 */
export const getUserKey = async (uid: UUID): Promise<UserKey> => {
    const { FullName } = await getUser(uid)
    return { Id: uid, FullName }
}

/**
 * Add a given item to a list for a user
 *
 * @param {UUID} uid
 * @param {string} listName Name of item list; will be created if does not exist
 * @param {*} addition
 * @return {UserKey}  Key of user upon sucessful insert
 */
export const addToUserList = async (uid: UUID, listName: string, addition): Promise<UserKey> => {
    const userKey = await getUserKey(uid)
    try {
        return await DB.addToEntryList(USER_TABLE_NAME, userKey, listName, addition);
    } catch (err) {
        try {
            await DB.addToEntry(USER_TABLE_NAME, userKey, listName, [])
            return await DB.addToEntryList(USER_TABLE_NAME, userKey, listName, addition);
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Insert or verify inclusion of the given item in a list of unique items for the user
 *
 * @param {UUID} uid User id
 * @param {string} setName Name of item list; will be created if does not exist
 * @param {*} addition Item to insert
 * @return {UserKey}  Key of user upon sucessful insert
 */
export const addToUserSet = async (uid: UUID, setName: string, addition): Promise<UserKey> => {
    const userKey = await getUserKey(uid)
    const setType = `S${getAWSType(addition)}`
    try {
        return await DB.addToEntrySet(USER_TABLE_NAME, userKey, setName, addition, setType);
    } catch (err) {
        try {
            await DB.addToEntry(USER_TABLE_NAME, userKey, setName, [], setType)
            return await DB.addToEntrySet(USER_TABLE_NAME, userKey, setName, addition, setType);
        } catch (error) {
            throw error;
        }
    }
}
