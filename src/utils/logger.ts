const segment = (msgType: string, msg: string, delimiter = '*') => console.info([delimiter.repeat(20), `${msgType.toUpperCase()}: ${JSON.stringify(msg)}`, delimiter.repeat(20)].join('\n'))
const info = (msgType: string, msg: string) => console.info(`\n* ${msgType.toUpperCase()}: ${JSON.stringify(msg)}`)
const debug = (msg, location = "") => console.debug(`** DEBUG[${location}]: ${JSON.stringify(msg)}`)
const warn = msg => console.warn(`\n* WARNING: ${msg}`)
const error = err => console.error(`\n* ERROR: ${err.message}`);

export const logger = { segment, info, debug, warn, error };

