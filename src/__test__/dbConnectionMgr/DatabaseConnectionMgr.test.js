const {createRecord} = require('../../dbConnectionMgr/DatabaseConnectionMgr')
const mysql2 = require("mysql2")

jest.mock('mysql2', () => {
    const mPool = {
        promise: jest.fn().mockReturnThis(),
        query: jest.fn(),
    };
    return {
        createPool: jest.fn(() => mPool),
    };
});

let mockRecord;

describe('Database functions', () =>{
    beforeEach(()=>{
        mockRecord = {
            firstName: "Brent",
            lastName: "Faiyaz",
            email: "Faiyaz@me.com",
            artist: "Joony"
        }
    });

    it('create record', async () =>{
        const insertId = 1;
        mysql2.createPool().query.mockResolvedValueOnce([{insertId}]);
        const result = await createRecord(mockRecord);
        expect(result).toBe(insertId);

    });
})

