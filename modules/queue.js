const kue = require('kue');

const queue = kue.createQueue({redis: process.env.REDIS_URL});

console.log(process.env.REDIS_URL);

module.exports = queue;