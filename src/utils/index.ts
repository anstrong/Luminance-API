export const objectMap = (obj, fn) => {
    return Object.fromEntries(Object.entries(obj).map(([key, val], i) => fn(key, val, i)))
}
