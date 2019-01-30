const kue = require('kue');

const queue = kue.createQueue({redis: { 
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_AUTH
  }});


module.exports = queue;