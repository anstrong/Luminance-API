import { VOCAB_TABLE_NAME } from '../env';
import { Word } from '../interface';
import { DB } from '../database';

export const getWord = async (id: string) => {
    return await DB.queryByID(VOCAB_TABLE_NAME, id) as Word;
}

export const addWord = async (word: string) => {
    return await DB.getIdOrCreate(VOCAB_TABLE_NAME, { Word: word });
}
