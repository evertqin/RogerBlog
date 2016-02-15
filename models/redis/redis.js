//#############################
// create redist client
//#############################
var logger = require('../logging/logger.js');
var redis = require('redis');
var redisClient;

if(typeof process.env.OPENSHIFT_REDIS_DB_HOST !== 'undefined' &&
typeof process.env.OPENSHIFT_REDIS_DB_PORT !== 'undefined'){
	logger.info("Using openshif redis");
  var options = {
    auth_pass: process.env.OPENSHIFT_REDIS_DB_PASSWORD
  };
  redisClient = redis.createClient(process.env.OPENSHIFT_REDIS_DB_PORT,
                            process.env.OPENSHIFT_REDIS_DB_HOST,
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
