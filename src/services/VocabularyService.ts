import { VOCAB_TABLE_NAME } from '../env';
import { UUID, Word } from '../interface';
import { DB } from '../database';

/**
 *
 *
 * @param {UUID} id
 * @return {Word} 
 */
export const getWord = async (id: UUID) => {
    return await DB.queryById(VOCAB_TABLE_NAME, id) as Word;
}

/**
 *
 *
 * @param {string} word
 * @return {UUID} id
 */
export const addWord = async (word: string) => {
    return await DB.getIdOrCreate(VOCAB_TABLE_NAME, { Word: word });
}
