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
var redisUtils = require('../models/business_logic/redis/redis_utils.js');

/* GET home page. */
mongoClient.connect(mongoUrl, function(err, db) {
  if (err !== null) {
    console.error(err);
  }

  router.get('/', function(req, res, next) {
    var visitorIp = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    var ipParts = visitorIp.split('.');
    if (!visitorIp.startsWith('10.') && !visitorIp.startsWith('192.168') && !visitorIp.startsWith('127.0.0') && ( ipParts.length === 4 &&
    !(ipParts[0] == '172' &&
    ipParts[1] >= 16 && ipParts[1] <= 31))) {
      console.log("called" + visitorIp);
      var visitorStats = db.collection('visitor_stats');
      visitorStats.insert({
        ip: visitorIp,
        timestamp: new Date(),
      });
    }


    var collection = db.collection('posts');
    var baseUrl = req.protocol + "://" + req.get('host');

    redisUtils.checkExistsInRedis(FRONT_PAGE_HIGHTLIGHT_CACHE)
      .then(redisUtils.getEntryFromRedis(FRONT_PAGE_HIGHTLIGHT_CACHE)
        .then(function(reply) {
          //resolve
          console.log("Get from Redis");
          res.render('index', {
            posts: JSON.parse(reply),
            baseUrl: baseUrl
          });
        }),
        function(reply) {
          //reject
          collection.find({}, {
            limit: PAGE_ITEM_LIMIT,
            sort: {
              id: -1
            }
          }).toArray(function(err, data) {
            for (var i = 0; i < data.length; ++i) {
              data[i].imgUrls = utils.extract_image_href(data[i].content);
              // reduce the data to send to front end
              data[i].content = utils.getFirstSeveralPTags(data[i].content).substr(0, CONTENT_LENGTH_LIMIT);
            }
            redisUtils.setRedisEntry(FRONT_PAGE_HIGHTLIGHT_CACHE, data, 60);
            res.render('index', {
              posts: data,
              baseUrl: baseUrl
            });
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
    visitorStats.find({}, {
      sort: {
        timestamp: -1
      }
    }).toArray(function(err, data) {
      if (err === null) {
        res.send(data);
      }
    });
  });

  router.get("/search", function(req, res, next) {

  });
});

module.exports = router;
