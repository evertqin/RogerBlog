//#############################
//  Imports
//#############################
var express = require('express');
var router = express.Router();
var utils = require('../models/business_logic/utils/utils.js');
var logger = require('../models/logging/logger.js');
var mongoClient = require('mongodb').MongoClient;
var redisClient = require('../models/redis/redis.js');
var cloudinary = require('cloudinary');
var Q = require('q');

cloudinary.config({
  cloud_name: 'evertqin',
  api_key: '134222639559228',
  api_secret: 'Uh9t8SpeCbTtBwBEVUssZiZQWGc'
});

router.get('/', function(req, res, next){
  var imageUrl = cloudinary.url("sample.jpg", { width: 100, height: 150, crop: 'fill' } );
  res.render('photography',{images:[imageUrl]});
});

module.exports = router;
