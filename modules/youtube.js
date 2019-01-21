const YouTube = require('simple-youtube-api');

const { youtube_key } = require('../tokens.json');

const youtube = new YouTube(process.env.YTAPI || youtube_key);

module.exports = youtube;