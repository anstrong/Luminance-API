import * as VocabService from "../VocabularyService";
import { DB } from '../../database';

const mockDB = jest.mocked(DB);

jest.mock('../../database/operations');
jest.mock('../../env');

describe('#getWord', () => {
    let result;

    beforeEach(async () => {
        result = await VocabService.getWord('some-word-id');
    });

    it('should query the database', () => {
        expect(mockDB.queryById).toHaveBeenCalledWith('some-vocab-table-name', 'some-word-id');
    });

    it('should return the query result', () => {
        expect(result).toBe('some-record');
    });
});

describe('#addWord', () => {
    let result;

    beforeEach(async () => {
        result = await VocabService.addWord('some-word');
    });

    it('should call the database', () => {
        expect(mockDB.getIdOrCreate).toHaveBeenCalledWith('some-vocab-table-name', { Word: 'some-word' });
    });

    it('should return the query result', () => {
        expect(result).toBe('some-id');
    });
});
