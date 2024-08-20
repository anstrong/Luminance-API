import { ObjectId } from "mongodb";
//import { UserCollection } from './client';
import { User } from "../interface";

const MOCK_USER = { words: ['some-words'], associations: {} }

export const getUser = async (uid: string) => {
    const user: User = { _id: uid, ...MOCK_USER }//await UserCollection.find(new ObjectId(uid));

    if (!user) {
        throw new Error(`User ${uid} not found`);
    }
    return user;
}
