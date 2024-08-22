import { STATUS_CODES } from '../constants';
const { SUCCESS, SERVER_ERROR } = STATUS_CODES;

export const errorHandler = (err, req, res, next) => {
    console.error(`ERROR: ${err.message}`);
    const statusCode = res.statusCode == SUCCESS ? SERVER_ERROR : res.statusCode;
    res.status(statusCode).json(err.message);
    next();
}
