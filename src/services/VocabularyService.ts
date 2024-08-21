import { VOCAB_TABLE_NAME } from '../env';
import { Word } from '../interface';
import { UserService } from '.';
import { DB } from '../database';

export const getWord = async (id: string) => {
    return await DB.queryByID(VOCAB_TABLE_NAME, id) as Word;
}
