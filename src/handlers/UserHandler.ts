import { UserService } from '../services';

export const getUser = async (req, res, next) => {
    try {
        const {
            headers: { uid }
        } = req

        const user = await UserService.getUser(uid);

        res.status(200).json(user);
        next();
    } catch (error) {
        next(error, res, next);
    }
}

export const addUser = async(req, res, next) => {
    try {
        const {
            body: { name }
        } = req

        if (!name) {
            throw new Error('Missing data: name')
        }

        const uid = await  UserService.addUser(name);
        const user = await UserService.getUser(uid);

        res.status(200).json(user);
        next();
    } catch (error) {
        next(error, res, next);
    }
}
