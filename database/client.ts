const MongoClient = require('mongodb').MongoClient;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const VOCAB_COLLECTION = 'vocabulary';
const USER_COLLECTION = 'user';

const client = new MongoClient(MONGO_CONNECTION_STRING);
const connection = await client.connect();

const getCollection = async (collName: string) => {
    return await connection.db(MONGO_DATABASE).collection(collName);
}

const closeConnection = async () => await connection.close();

export const VocabCollection = await getCollection(VOCAB_COLLECTION);
export const UserCollection = await getCollection(USER_COLLECTION);
