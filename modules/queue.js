const kue = require('kue');

console.log(process.env.REDIS_URL);

const queue = kue.createQueue({redis: process.env.REDIS_URL_STUNNEL});


module.exports = queue;