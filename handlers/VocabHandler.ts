import { VocabularyService } from '../database';

export const getVocabulary = async (req, res, next) => {
    const {
        params: { uid }
    } = req

    try {
        const words = await VocabularyService.getUserVocabulary(uid);

        res.status(200).json({ words });
    } catch (error) {
        next(error, req);
    }
}
