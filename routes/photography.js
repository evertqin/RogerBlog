//#############################
//  Imports
//#############################
var express = require('express');
var router = express.Router();
var utils = require('../models/business_logic/utils/utils.js');
var logger = require('../models/logging/logger.js');
var mongoClient = require('mongodb').MongoClient;
var redisClient = require('../models/redis/redis.js');
var imageHandler = require('./images/imgur_handler');

router.get('/', function(req, res, next){
  console.log(imageHandler);
  res.render('photography');
});

module.exports = router;
