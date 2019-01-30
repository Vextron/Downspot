const kue = require('kue');

console.log(process.env);

const queue = kue.createQueue({redis: `redis${process.env.REDIS_URL}`});


module.exports = queue;