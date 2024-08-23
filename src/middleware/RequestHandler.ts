import { STATUS_CODES } from '../constants';
const { BAD_REQUEST } = STATUS_CODES;

export const requestHandler = (req, res, next) => {
    try {
        const {
            headers
        } = req
        console.info(`\nREQUEST: ${JSON.stringify({ ...headers, endpoint: req.originalUrl })}`)


        if (!headers.uid) {
            res.statusCode = BAD_REQUEST;
            throw new Error('Missing header: uid');
        }

        next();
    } catch (error) {
        next(error, res, next);
    }
}
