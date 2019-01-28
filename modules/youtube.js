const YouTube = require('simple-youtube-api');

const { youtube_key } = process.env.YTAPI || require('../tokens.json');

const youtube = new YouTube(youtube_key);

module.exports = youtube;