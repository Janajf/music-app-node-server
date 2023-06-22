const env = require("dotenv");
const axios = require("axios");
const qs = require("qs");
env.config();

const getToken = async () => {
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  try {
    const tempToken = await axios.post(
      tokenUrl,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: clientID,
        client_secret: clientSecret,
      })
    );
    return tempToken.data.access_token;
  } catch (err) {
    return undefined;
  }
};

const getArtistDiscography = async (searchInput) => {
  try {
    let token = await getToken();
    if(token === undefined){
        return "Bad Token"
    }
    const url = `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    };
    const result = await axios.get(url,config);
    return result.data;
  } catch (err) {
    token = undefined;
    return "Bad call"
  }
};
module.exports = { getArtistDiscography };
