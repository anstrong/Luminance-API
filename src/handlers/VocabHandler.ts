import { UserService, VocabularyService } from '../services';
import { STATUS_CODES } from '../constants';
const { SUCCESS, BAD_REQUEST } = STATUS_CODES;

/*
export const getWords = async (req, res, next) => {
    try {
        const {
            body: { word }
        } = req

        const wordId = await VocabularyService.addWord(word);

        res.status(SUCCESS).send(`${word} successfully added.`);
        next();
    } catch (error) {
        next(error, res, next);
    }
}*/
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getUserVocabulary = async (req, res, next) => {
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

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const addToVocabulary = async (req, res, next) => {
    try {
        const {
            body: { word }
        } = req

        const wordId = await VocabularyService.addWord(word);

        res.status(SUCCESS).json(`${word} successfully added.`);
        next();
    } catch (error) {
        next(error, res, next);
    }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getUserWordAssociations = async (uid: string, word: string) => {
    const user = await UserService.getUser(uid);
    const { Associations } = user || {};

    return Associations[word] ?? [];
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const addWordToUser = async (req, res, next) => {
    try {
        const {
            headers: { uid },
            body: { word }
        } = req

        if (!word) {
            res.statusCode = BAD_REQUEST;
            throw new Error('Missing body: word');
        }

        const wordId = await VocabularyService.addWord(word);
        const userFullName = await UserService.addToUserSet(uid, 'Words', wordId);

        res.status(SUCCESS).json(`${word} successfully added to ${userFullName}.`);
        next();
    } catch (error) {
        next(error, res, next);
    }
}
