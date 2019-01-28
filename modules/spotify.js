const SpotifyWebApi = require('spotify-web-api-node');
const { credentials } = process.env.CREDENTIALS || require('../tokens.json');

const spotifyApi = new SpotifyWebApi(credentials);

module.exports = spotifyApi;