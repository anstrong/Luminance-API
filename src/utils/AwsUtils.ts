import { AWSTypeMap } from "../constants";
import { objectMap } from ".";
import { StringObject } from "../interface";

export const parseResult = (item: StringObject<StringObject>) => {
    return objectMap(item, (attr, val, i) => [attr, Object.values(val)[0]]);
}

export const getAWSType = val => {
    const datatype = Array.isArray(val) ? "array" : typeof val
    return AWSTypeMap[datatype]
}

export const generateTypedParam = (val) => {
    try {
        const typecode = getAWSType(val)
        return { [typecode]: val };
    } catch (error) {
        throw new Error('ERROR: invalid AWS parameter type')
    }
}

export const generateTypedParams = (data: StringObject) => {
    return objectMap(data, (attr, val, i) => [attr, generateTypedParam(val)]) as StringObject<StringObject>
}

export const generateExpressionKey = key => `:${key.toLowerCase()}`

export const generateAttributeValues = attrs => objectMap(attrs, ([key, value]) => [generateExpressionKey(key), value])

export const generateConditionExpressionList = attrs => Object.keys(attrs).reduce((result, key) => `${result}, ${key}=${generateExpressionKey(key)}`, '')
