const {
  getArtistDiscography,
} = require("../../spotifyConnectionMgr/spotifyMgr");

const axios = require("axios");

jest.mock("axios");

describe("Get artist discography", () => {
  let mockDiscography;
  let mockToken;

  beforeEach(() => {
    mockDiscography = {
      data: {
        artists: {
          href: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=0&limit=20",
          items: ["album"],
          limit: 20,
          next: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=20&limit=20",
          offset: 0,
          previous: null,
          total: 38,
        },
      },
    };
    mockToken = {
      data: {
        access_token:
          "BQAj-w6D-Q8-gs1wqu_XN6Ux62q1I2k1akpTGoHQ2VzToPZ6fm7wWYWY5_lsuvVzD_uOkGFqYvptoi5NXjtrTjAVcYc52BIqi7mnUVuoHLRvWRwRDB4",
      },
    };

    axios.post.mockResolvedValueOnce(mockToken);
  });

  it("Should retrieve artist discography", async () => {

    axios.get.mockResolvedValueOnce(mockDiscography);

    const result = await getArtistDiscography("SZA");

    expect(result).toEqual({
      artists: {
        href: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=0&limit=20",
        items: ["album"],
        limit: 20,
        next: "https://api.spotify.com/v1/search?query=Kem&type=artist&offset=20&limit=20",
        offset: 0,
        previous: null,
        total: 38,
      },
    });
  });
});
