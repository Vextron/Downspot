const kue = require('kue');

console.log(process.env.REDIS_URL_STUNNEL);

const queue = kue.createQueue({redis: `redis${process.env.REDIS_URL_STUNNEL}`});


module.exports = queue;