const request = require("supertest");
const appFactory = require("../appFactor");

describe("Search record", () => {
  let mockDBConnectionMgr;
  let testApp;
  let mockRecord;

  beforeEach(()=>{
    mockDBConnectionMgr = {
        createRecord: jest.fn()
    };

    mockRecord = {
        record: {
            firstName: "Brent",
            lastName: "Faiyaz",
            email: "Faiyaz@me.com",
            artist: "Joony"
        }
    };

    testApp = appFactory(mockDBConnectionMgr);
});


  testApp = appFactory(mockDBConnectionMgr);

  it("Should respond with 400", async () => {
    const response = await request(testApp)
        .post("/record")
        .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        status:'error',
        message:'Please provide all the required feilds'

    });
  });

  it('Should respond with 201', async ()=>{
    const mockId = 1;
    mockDBConnectionMgr.createRecord.mockResolvedValue(mockId);
    const response = await request(testApp)
    .post('/record')
    .send(mockRecord)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
        status:'created',
        data:{
            record: {
                id:mockId,
                firstName: "Brent",
                lastName: "Faiyaz",
                email: "Faiyaz@me.com",
                artist: "Joony"
            }

        }
    })
  })

  it('Should respond with 500', async ()=>{
    mockDBConnectionMgr.createRecord.mockRejectedValue(new Error('Database error'));
    const response = await request(testApp)
    .post('/record')
    .send(mockRecord);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
        status: 'error',
        message: 'Database operation failed'
    });
  })

});
