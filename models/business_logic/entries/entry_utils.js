var redisUtils = require('../redis/redis_utils.js');

var entry_utils = entry_utils || {};
var ALL_ENTRIES_SORTED_TIMESTAMP_KEY = "all_entries_sorted_timestamp_key";

entry_utils.getAllEntries = function(collection, callback){

  redisUtils.checkExistsInRedis(ALL_ENTRIES_SORTED_TIMESTAMP_KEY)
  .then(redisUtils.getEntryFromRedis(ALL_ENTRIES_SORTED_TIMESTAMP_KEY)
  .then(function(reply){
    if(callback){
      callback(null, reply);
    }
  }, function(error){
    var options = {
      sort:{timestamp: -1},
    };

    collection.find({}, options).toArray(function(err, data){
      if(err){
        callback(err, null);
      } else {

        var result = {};

        for(var i = 0; i < data.length; ++i){
          var date = new Date(data[i].date);
          var month = date.getMonth() + 1;
          month = (month < 10 ? '0': '') + month;

          var monthKey = date.getFullYear() + '-' + month;
          var selected = {
            id: data[i].id,
            date: data[i].date,
            title: data[i].title,
            tag: data[i].tag,
          };

          if(result[monthKey]) {
            result[monthKey].push(selected);
          } else{
            result[monthKey] = [selected];
          }
        }

        redisUtils.setRedisEntry(ALL_ENTRIES_SORTED_TIMESTAMP_KEY, result, -1);
        callback(null, result);
      }
    });
  })

);

// var options = {
//   sort:{timestamp: -1},
// };
// if(redisClient)
// collection.find({},options).toArray(function(err, data) {
//
// });
};

module.exports = entry_utils;
