import { VocabularyService } from '../services';

export const getVocabulary = async (req, res, next) => {
    try {
        const {
            headers: { uid }
        } = req

        const words = await VocabularyService.getUserVocabulary(uid);

        res.status(200).json({ words });
        next();
    } catch (error) {
        next(error, res, next);
    }
}
