export const requestHandler = (req, res, next) => {
    try {
        const {
            headers
        } = req
        console.info(`\nREQUEST: ${JSON.stringify(headers)}`)

        if (!headers.uid) {
            throw new Error('Missing header: uid')
        }

        next();
    } catch (error) {
        next(error, res, next);
    }
}
