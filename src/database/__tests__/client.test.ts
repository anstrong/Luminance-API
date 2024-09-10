import { addToTable, queryTable, scanTable, updateEntry } from "../client";
import connection from '../connection';

jest.mock('../connection');
jest.mock('../../utils/AwsUtils')

describe('#addToTable', () => {
    let result;

    beforeEach(async () => {
        result = await addToTable('some-table-name', 'some-item')
    });

    it('should call the connection to execute an insert', () => {
        expect(connection.execute).toHaveBeenCalledWith('putItem', { TableName: 'some-table-name', Item: 'some-item' }, 'params')
    });

    it('should return the inserted item', () => {
        expect(result).toBe('some-item');
    });
})

describe('#queryTable', () => {
    let result;

    beforeEach(async () => {
        result = await queryTable('some-table-name', { 'some-attr': 'some-value' })
    });

    it('should call the connection to execute the query', () => {
        expect(connection.execute).toHaveBeenCalledWith('query', { TableName: 'some-table-name', 'some-attr': 'some-value' }, 'result')
    });

    it('should return the inserted item', () => {
        expect(result).toBe('some-result');
    });
})

describe('#scanTable', () => {
    let result;

    beforeEach(async () => {
        result = await scanTable('some-table-name', { 'some-attr': 'some-value' })
    });

    it('should call the connection to execute the scan', () => {
        expect(connection.execute).toHaveBeenCalledWith('scan', { TableName: 'some-table-name', 'some-attr': 'some-value' }, 'result')
    });

    it('should return the inserted item', () => {
        expect(result).toBe('some-result');
    });
})

describe('#updateEntry', () => {
    let result;

    beforeEach(async () => {
        jest.clearAllMocks();
        result = await updateEntry('some-table-name', ['some-value'], 'some-expression')
    });

    it('should call the connection to execute an insert', () => {
        expect(connection.execute).toHaveBeenCalledWith('updateItem', { TableName: 'some-table-name', Key: 'some-typed-params', UpdateExpression: 'some-expression' }, 'params')
    });

    it('should return the updated record', () => {
        expect(result).toEqual(['some-value']);
    });
})
