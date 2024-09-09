import { NO_UID_WHITELIST, STATUS_CODES } from '../constants';
const { BAD_REQUEST } = STATUS_CODES;

export const requestHandler = (req, res, next) => {
    try {
        const {
            headers,
            originalUrl: endpoint
        } = req

        console.info(`\nREQUEST: ${JSON.stringify({ ...headers, endpoint })}`)


        if (!(headers.uid || NO_UID_WHITELIST.includes(endpoint))) {
            res.statusCode = BAD_REQUEST;
            throw new Error('Missing header: uid');
        }

        next();
    } catch (error) {
        next(error, res, next);
    }
}
