import { UserService } from '.';
import { Word } from '../interface';
import { VOCAB_TABLE_NAME } from '../env';

export const getUserVocabulary = async (uid: string) => {
    const user = await UserService.getUser(uid);
    //const wordIds: OIDs<Word> = user.words.map((wordId: string) => new ObjectId(wordId));
    //const words: Word[] = await VocabCollection.find({ _id: { $in: wordIds } });

    return user.Words;
}

export const getUserWordAssociations = async (uid: string, word: string) => {
    const user = await UserService.getUser(uid);
    const { Associations } = user;

    return Associations[word];
}
