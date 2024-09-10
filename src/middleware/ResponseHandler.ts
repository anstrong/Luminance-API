import { logger } from "../utils/logger";

export const responseHandler = (req, res, next) => {
    logger.segment('RESPONSE', `${res.statusCode} ${res.statusMessage}`);
}


