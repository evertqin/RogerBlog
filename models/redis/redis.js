//#############################
// create redist client
//#############################
var logger = require('../logging/logger.js');
var redis = require('redis');
var redisClient;

if(typeof process.env.OPENSHIFT_REDIS_HOST !== 'undefined' &&
typeof process.env.OPENSHIFT_REDIS_PORT !== 'undefined'){
  var options = {
    auth_pass:'ZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5'
  };
  redisClient = redis.createClient(process.env.OPENSHIFT_REDIS_PORT,
                            process.env.OPENSHIFT_REDIS_HOST,
                            options);
} else {
  redisClient  = redis.createClient();
}

redisClient.on('ready', function(){
  logger.info('Redis client is ready');
});

redisClient.on('error', function(err){
  logger.error("Error " + err);
});

module.exports = redisClient;
