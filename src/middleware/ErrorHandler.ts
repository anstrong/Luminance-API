import { STATUS_CODES } from '../constants';
const { SERVER_ERROR } = STATUS_CODES;

export const errorHandler = (err, req, res, next) => {
    console.error(`ERROR: ${err.message}`);
    const statusCode = res.statusCode ?? SERVER_ERROR;
    res.status(statusCode).json(err.message);
    next();
}
