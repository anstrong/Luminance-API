export const objectMap = (obj: object, fn: Function): object => {
    return Object.fromEntries(Object.entries(obj).map(([key, val], i) => fn(key, val, i)))
}
