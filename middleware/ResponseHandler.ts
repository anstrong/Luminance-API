export const responseHandler = (req, res, next) => {
    console.info(`RESPONSE: ${res.statusCode} ${res.statusMessage}`);
}


