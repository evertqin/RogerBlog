var redisClient = require('../../redis/redis.js');

var redis_utils = redis_utils || {};

redis_utils.checkExistsInRedis = function(key) {
  return new Promise(function(resolve, reject){
    redisClient.exists(key, function(err, reply){

      if(err) {
        reject(Error(err));
      } else if (reply === 1){
        resolve(reply);
      } else {
        reject('The key ' + key + ' does not exist!');
      }

    });
  });
};

redis_utils.getEntryFromRedis = function(key){
  return new Promise(function(resolve, reject){
    redisClient.get(key, function(err, reply){
      if(err) {
        reject(Error(err));
      } else if(!reply) {
        reject('Object is null, need to fetch from db');
      } else {
        resolve(reply);
      }
    });
  });
};

redis_utils.setRedisEntry = function(key, value, expire){
  redisClient.set(key, JSON.stringify(value));
  redisClient.expire(key, isNaN(expire) ? 60 : expire);
};

redis_utils.clearRedisEntry = function(key){
  redisClient.del(key);
};

module.exports = redis_utils;
