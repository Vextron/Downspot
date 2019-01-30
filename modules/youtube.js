const YouTube = require('simple-youtube-api');

// NOTE: Production only 
const youtube_key = process.env.YTAPI;

// const { youtube_key } = require('../tokens.json');

const youtube = new YouTube(youtube_key);

module.exports = youtube;