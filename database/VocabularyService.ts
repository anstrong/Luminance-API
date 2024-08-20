import { ObjectId } from 'mongodb';
import { UserService } from '.';
import { VocabCollection } from './client';
import { OIDs, Word } from '../interface';

export const getUserVocabulary = async (uid: string) => {
    const user = await UserService.getUser(uid);
    const wordIds: OIDs<Word> = user.words.map((wordId: string) => new ObjectId(wordId));
    const words: Word[] = await VocabCollection.find({ _id: { $in: wordIds } });

    return words;
}

export const getUserWordAssociations = async (uid: string, word: string) => {
    const user = await UserService.getUser(uid);
    const { associations } = user;

    return associations[word];
}
