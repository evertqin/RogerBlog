var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var utils = require('../models/business_logic/utils/utils.js');
var db = monk('localhost:27017/nodetest1');
/* GET home page. */
router.get('/', function (req, res, next) {
  var collection = db.get('posts');
  collection.find({},{limit:8, sort:{id: -1}},function(e, data) {
    for(var i = 0; i < data.length; ++i) {
      data[i].imgUrls = utils.extract_image_href(data[i].content);
      data[i].content = data[i].content.substr(0, 50); // reduce the data to send to front end
    }
      res.render('index', {posts:data});
  });
});

module.exports = router;
