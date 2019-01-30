const SpotifyWebApi = require('spotify-web-api-node');

// NOTE: Production Only

const credentials = {

    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT
}

//const { credentials } = require('../tokens.json');

const spotifyApi = new SpotifyWebApi(credentials);

module.exports = spotifyApi;