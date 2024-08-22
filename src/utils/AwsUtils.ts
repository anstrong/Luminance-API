import { AWSTypeMap } from "../constants";
import { objectMap } from ".";

export const parseResult = (item) => {
    return objectMap(item, (attr, val, i) => [attr, Object.values(val)[0]]);
}

export const generateTypedParams = (data, primitivesOnly = true) => {
    return objectMap(data, (attr, val, i) => {
        const datatype = typeof val
        try {
            const typecode = AWSTypeMap[datatype]
            return [attr, { [typecode]: val }];
        } catch (error) {
            throw new Error('ERROR: invalid AWS parameter type')
        }
    })
}
