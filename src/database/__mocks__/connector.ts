export const queryById = jest.fn(() => 'some-user')
export const getIdOrCreate = jest.fn(() => 'some-id')
export const addToEntryList = jest.fn((tableName, entryKey, ...rest) => entryKey)
export const addToEntrySet = jest.fn((tableName, entryKey, ...rest) => entryKey)
export const addToEntry = jest.fn((tableName, entryKey, ...rest) => entryKey)
