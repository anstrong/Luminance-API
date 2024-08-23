import { UserService } from '../services';
import { STATUS_CODES } from '../constants';
const { SUCCESS, BAD_REQUEST } = STATUS_CODES;

export const getUser = async (req, res, next) => {
    try {
        const {
            headers: { uid }
        } = req

        const user = await UserService.getUser(uid);

        res.status(SUCCESS).json(user);
        next();
    } catch (error) {
        next(error, res, next);
    }
}

export const addUser = async (req, res, next) => {
    try {
        const {
            body: { name }
        } = req

        if (!name) {
            res.statusCode = BAD_REQUEST;
            throw new Error('Missing body: name');
        }

        const uid = await UserService.addUser(name);

        res.status(SUCCESS).json(uid);
        next();
    } catch (error) {
        next(error, res, next);
    }
}
