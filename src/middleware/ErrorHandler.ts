import { STATUS_CODES } from '../constants';
import { NODE_ENV } from '../env';
const { SUCCESS, SERVER_ERROR } = STATUS_CODES;

export const errorHandler = (err, req, res, next) => {
    console.error(`ERROR: ${err.message}`);
    const statusCode = (res.statusCode in STATUS_CODES && res.statusCode !== SUCCESS) || NODE_ENV == 'development' ? res.statusCode : SERVER_ERROR;
    res.status(statusCode).json(err.message);
    next();
}
