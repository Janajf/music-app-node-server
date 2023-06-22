const request = require("supertest");
const appFactory = require("../appFactor");

describe("App factory tests", () => {
  let mockDBConnectionMgr;
  let mockSpotifyMgr;
  let testApp;
  let mockRecord;

  beforeEach(()=>{
    mockDBConnectionMgr = {
        createRecord: jest.fn()
    };

    mockSpotifyMgr = {
      getArtistDiscography: jest.fn()
    };

    mockRecord = {
        record: {
            firstName: "Brent",
            lastName: "Faiyaz",
            email: "Faiyaz@me.com",
            artist: "Joony"
        }
    };

    testApp = appFactory(mockDBConnectionMgr,mockSpotifyMgr);
});


  testApp = appFactory(mockDBConnectionMgr);

  describe('POST record', () =>{
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

  })

  

  describe('GET artist', () =>{
    it("Should respond with 400", async () => {
      const response = await request(testApp)
          .get('/artist')
          .send({});
      expect(response.statusCode).toBe(400);

      expect(response.body).toEqual({
          status:'error',
          message:'Please provide the artist\'s name'
  
      })
    });

    it('Should return album data', async ()=>{
      const mockDiscography = {
        artists: {
        href: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=0&limit=20",
        items: ["album"],
        limit: 20,
        next: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=20&limit=20",
        offset: 0,
        previous: null,
        total: 38,
      }}

      mockSpotifyMgr.getArtistDiscography.mockResolvedValue(mockDiscography);
      const response = await request(testApp)
      .get('/artist?artist=SZA')
      .send(mockDiscography)

      expect(response.body).toEqual(
        mockDiscography
      )
    });

    it('Should respond with 500', async ()=>{
      mockSpotifyMgr.getArtistDiscography.mockRejectedValue(new Error('Database error'));
      const response = await request(testApp)
      .get('/artist?artist=SZA')
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Database operation failed. Failed to get artist discography'
    })



    });

   
  })

});



