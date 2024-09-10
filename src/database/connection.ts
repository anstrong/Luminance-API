import { DYNAMO_DB_URL, AWS_REGION } from '../env'
import { logger } from '../utils/logger';

const AWS = require("aws-sdk");
AWS.config.update({ region: AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", endpoint: DYNAMO_DB_URL });

const execute = async (operation, params, logMode = 'result') => {
    if (logMode === 'params' || logMode === 'both') {
        logger.info(operation, params);
    }

    try {
        const result = await ddb[operation](params, function (err, data) {
            return data;
        }).promise();

        if (logMode === 'result' || logMode === 'both') {
            logger.info(operation, result);
        }

        return result;
    } catch (err) {
        logger.debug(err, 'dynamo')
        throw new Error(`Database operation "${operation}" failed`);
    }
}

 export default { execute };
