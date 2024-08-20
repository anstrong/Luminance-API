import { ObjectId } from "mongodb";
import { UserCollection } from './client';
import { User } from "../interface";

export const getUser = async (uid: string) => {
    const user: User = await UserCollection.find(new ObjectId(uid));

    if (!user) {
        throw new Error(`User ${uid} not found`);
    }
    return user;
}
