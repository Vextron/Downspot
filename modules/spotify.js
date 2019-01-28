const SpotifyWebApi = require('spotify-web-api-node');
const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT

}// || require('../tokens.json');

const spotifyApi = new SpotifyWebApi(credentials);

module.exports = spotifyApi;