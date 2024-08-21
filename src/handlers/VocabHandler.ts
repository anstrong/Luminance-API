import { UserService, VocabularyService } from '../services';
import { STATUS_CODES } from '../constants';
const { SUCCESS } = STATUS_CODES;

export const getVocabulary = async (req, res, next) => {
    try {
        const {
            headers: { uid }
        } = req

        const user = await UserService.getUser(uid);
        const { Words } = user || {};

        const words = Words.map(async (wordId: string) => await VocabularyService.getWord(wordId))

        res.status(SUCCESS).json({ words });
        next();
    } catch (error) {
        next(error, res, next);
    }
}

export const getUserWordAssociations = async (uid: string, word: string) => {
    const user = await UserService.getUser(uid);
    const { Associations } = user || {};

    return Associations[word] ?? [];
}
