//#############################
//  Constants
//#############################
var PAGE_ITEM_LIMIT = 8;
var CONTENT_LENGTH_LIMIT = 200;
var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';
var FRONT_PAGE_HIGHTLIGHT_CACHE = 'front_page_highlight';
//#############################
//  Imports
//#############################
var express = require('express');
var router = express.Router();
var utils = require('../models/business_logic/utils/utils.js');
var logger = require('../models/logging/logger.js');
var mongoClient = require('mongodb').MongoClient;
var redisClient = require('../models/redis/redis.js');
var Q = require('q');

/* GET home page. */
mongoClient.connect(mongoUrl, function(err, db) {
  if (err !== null) {
    console.error(err);
  }

  router.get('/', function (req, res, next) {
    var visitorIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    if(visitorIp !== "127.0.0.1") {
      var visitorStats = db.collection('visitor_stats');
      visitorStats.insert({
        ip: visitorIp,
        timestamp: new Date(),
      });
    }


    var collection = db.collection('posts');
    var baseUrl = req.protocol + "://" + req.get('host');

    var checkExistsInRedis = function(key) {
      var deferred = Q.defer();
      redisClient.exists(key, function(err, reply){
        if(err !== null) {
          deferred.reject(new Error(err));
        } else {
          if(reply === 1){
            deferred.resolve(reply);
          } else {
            deferred.reject('The key ' + key + ' does not exist!');
          }
        }
      });
      return deferred.promise;
    };

    var getEntryFromRedis = function(key){
      var deferred = Q.defer();
      redisClient.get(key, function(err, reply){
        if(err !== null){
          deferred.reject(new Error(err));
        } else {
          if(reply === null){
            deferred.reject('Object is null, need to fetch from db');
          } else {
            deferred.resolve(reply);
          }
        }
      });
      return deferred.promise;
    };

    checkExistsInRedis(FRONT_PAGE_HIGHTLIGHT_CACHE)
    .then(getEntryFromRedis(FRONT_PAGE_HIGHTLIGHT_CACHE)
    .then(function(reply){
      //resolve
      logger.info("Getting front page from redis");
      res.render('index', {posts:JSON.parse(reply), baseUrl:baseUrl});
    }), function(reply){
      //reject
      logger.warn(reply);
      collection.find({}, {limit:PAGE_ITEM_LIMIT, sort:{id: -1}}).toArray(function(err, data) {
        for(var i = 0; i < data.length; ++i) {
          data[i].imgUrls = utils.extract_image_href(data[i].content);
          // reduce the data to send to front end
          data[i].content = utils.getFirstSeveralPTags(data[i].content).substr(0, CONTENT_LENGTH_LIMIT);
        }
        redisClient.set(FRONT_PAGE_HIGHTLIGHT_CACHE, JSON.stringify(data));
        redisClient.expire(FRONT_PAGE_HIGHTLIGHT_CACHE, 60);
        res.render('index', {posts:data, baseUrl:baseUrl});
      });
    });


  });

  router.get('/ip', function(req, res, next) {
    var clientIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    res.send({
      ip: clientIp,
      timestamp: new Date(),
    });
  });

  router.get('/site_stats', function(req, res, next) {
    var visitorStats = db.collection('visitor_stats');
    visitorStats.find({}, {sort: {timestamp: -1}}).toArray(function(err, data) {
      if(err === null) {
        res.send(data);
      }
    });
  });

  router.get("/search", function(req, res, next) {

  });
});

module.exports = router;
