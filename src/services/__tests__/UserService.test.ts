import * as UserService from "../UserService";
import { DB } from '../../database';
import { User } from "../../interface";

const mockDB = jest.mocked(DB);

jest.mock('../../database/connector');
jest.mock('../../env');
jest.mock('../../utils/AwsUtils', () => ({
    getAWSType: jest.fn(() => 'some-set-type')
}));

describe('#getUser', () => {
    let result;

    beforeEach(async () => {
        result = await UserService.getUser('some-user-id');
    });

    it('should query the database', () => {
        expect(mockDB.queryById).toHaveBeenCalledWith('some-user-table-name', 'some-user-id');
    });

    it('should return the query result', () => {
        expect(result).toBe('some-user');
    });
});

describe('#addUser', () => {
    let result;

    beforeEach(async () => {
        result = await UserService.addUser('some-name');
    });
    it('should call the database', () => {
        expect(mockDB.getIdOrCreate).toHaveBeenCalledWith('some-user-table-name', { FullName: 'some-name' });
    });

    it('should return the query result', () => {
        expect(result).toBe('some-id');
    });
});

describe('#getUserKey', () => {
    let result;
    const mockGetUser = jest.spyOn(UserService, 'getUser')

    beforeEach(async () => {
        mockGetUser.mockResolvedValue({ FullName: 'some-name' } as User)
        result = await UserService.getUserKey('some-user');
    });

    it('should get the user name', () => {
        expect(mockGetUser).toHaveBeenCalledWith('some-user');
    });

    it('should return the correct key', () => {
        expect(result).toStrictEqual({ Id: 'some-user', FullName: 'some-name' });
    });

    describe('when the user record fetch fails', () => {
        beforeEach(() => {
            mockGetUser.mockRejectedValueOnce(new Error('some-error'))
        })

        it('should not intercept the error', () => {
            expect(async () => await UserService.getUserKey('some-user')).rejects.toThrow('some-error')
        })
    })
});

describe('#addToUserList', () => {
    let result;
    const mockGetUserKey = jest.spyOn(UserService, 'getUserKey')

    beforeEach(async () => {
        // @ts-ignore
        mockGetUserKey.mockResolvedValue('some-user-key');
        result = await UserService.addToUserList('some-user', 'some-list', 'some-addition');
    });

    it('should get the user name', () => {
        expect(mockGetUserKey).toHaveBeenCalledWith('some-user');
    });

    it('should call the database with the correct key', () => {
        expect(mockDB.addToEntryList).toHaveBeenCalledWith('some-user-table-name', 'some-user-key', 'some-list', 'some-addition');
    });

    it('should return the key of the updated record', () => {
        expect(result).toStrictEqual('some-user-key');
    });

    describe('when the user record fetch fails', () => {
        beforeEach(() => {
            mockGetUserKey.mockRejectedValueOnce(new Error('some-error'))
        })

        it('should not intercept the error', () => {
            expect(async () => await UserService.addToUserList('some-user', 'some-list', 'some-addition')).rejects.toThrow('some-error')
        })
    })

    describe('when the user list addition fails', () => {
        beforeEach(async () => {
            (mockDB.addToEntryList).mockRejectedValueOnce(new Error('some-error'));

            result = await UserService.addToUserList('some-user', 'some-list', 'some-addition');
        })

        it('should call the database to create the required list', () => {
            expect(mockDB.addToEntry).toHaveBeenCalledWith('some-user-table-name', 'some-user-key', 'some-list', []);
        })

        it('should successfully return the key of the updated record', () => {
            expect(result).toStrictEqual('some-user-key');
        });

        describe('when the user list creation fails', () => {
            beforeEach(async () => {
                (mockDB.addToEntryList).mockRejectedValueOnce(new Error('some-error'));
                (mockDB.addToEntry).mockRejectedValueOnce(new Error('some-other-error'));
            })

            it('should throw the error', () => {
                expect(async () => await UserService.addToUserList('some-user', 'some-list', 'some-addition')).rejects.toThrow('some-other-error')
            })
        })
    })
});

describe('#addToUserSet', () => {
    let result;
    const mockGetUserKey = jest.spyOn(UserService, 'getUserKey')

    beforeEach(async () => {
        // @ts-ignore
        mockGetUserKey.mockResolvedValue('some-user-key');
        result = await UserService.addToUserSet('some-user', 'some-set', 'some-addition');
    });

    it('should get the user name', () => {
        expect(mockGetUserKey).toHaveBeenCalledWith('some-user');
    });

    it('should call the database with the correct key', () => {
        expect(mockDB.addToEntrySet).toHaveBeenCalledWith('some-user-table-name', 'some-user-key', 'some-set', 'some-addition', 'Ssome-set-type');
    });

    it('should return the key of the updated record', () => {
        expect(result).toStrictEqual('some-user-key');
    });

    describe('when the user record fetch fails', () => {
        beforeEach(() => {
            mockGetUserKey.mockRejectedValueOnce(new Error('some-error'))
        })

        it('should not intercept the error', () => {
            expect(async () => await UserService.addToUserSet('some-user', 'some-set', 'some-addition')).rejects.toThrow('some-error')
        })
    })

    describe('when the user set addition fails', () => {
        beforeEach(async () => {
            (mockDB.addToEntrySet).mockRejectedValueOnce(new Error('some-error'));

            result = await UserService.addToUserSet('some-user', 'some-set', 'some-addition');
        })

        it('should call the database to create the required set', () => {
            expect(mockDB.addToEntry).toHaveBeenCalledWith('some-user-table-name', 'some-user-key', 'some-set', [], 'Ssome-set-type');
        })

        it('should successfully return the key of the updated record', () => {
            expect(result).toStrictEqual('some-user-key');
        });

        describe('when the user set creation fails', () => {
            beforeEach(async () => {
                (mockDB.addToEntrySet).mockRejectedValueOnce(new Error('some-error'));
                (mockDB.addToEntry).mockRejectedValueOnce(new Error('some-other-error'));
            })

            it('should throw the error', () => {
                expect(async () => await UserService.addToUserSet('some-user', 'some-set', 'some-addition')).rejects.toThrow('some-other-error')
            })
        })
    })
});

