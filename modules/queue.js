const kue = require('kue');

const { redis_config } = require('../tokens.json');

// NOTE: Production only
/* const redis_config = { 
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  auth: process.env.REDIS_AUTH
} */

const queue = kue.createQueue({redis: redis_config});


module.exports = queue;