import { STATUS_CODES } from '../constants';
import { NODE_ENV } from '../env';
import { logger } from '../utils/logger';
const { SUCCESS, SERVER_ERROR } = STATUS_CODES;

export const errorHandler = (err, req, res, next) => {
    logger.error(err);
    const statusCode = (res.statusCode in STATUS_CODES && res.statusCode !== SUCCESS) || NODE_ENV == 'development' ? res.statusCode : SERVER_ERROR;
    res.status(statusCode).json(err.message);
    next();
}
