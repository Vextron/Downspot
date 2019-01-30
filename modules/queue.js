const kue = require('kue');

console.log(process.env);

const queue = kue.createQueue({redis: process.env.REDIS_URL_STUNNEL});


module.exports = queue;