var express = require('express');
var router = express.Router();
var utils = require('../models/business_logic/utils/utils.js');

var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';

/* GET home page. */
mongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    throw "Error connecting to database.";
  }

  router.get('/', function (req, res, next) {
    var collection = db.collection('posts');
    var baseUrl = req.protocol + "://" + req.get('host');
    collection.find({}, {limit:8, sort:{id: -1}}).toArray(function(err, data) {
      for(var i = 0; i < data.length; ++i) {
        data[i].imgUrls = utils.extract_image_href(data[i].content);
        // reduce the data to send to front end
        data[i].content = utils.get_first_several_p_tags(data[i].content).substr(0, 200);
        //  data[i].content = utils.remove_image_href(data[i].content).substr(0, 200);
      }
      res.render('index', {posts:data, baseUrl:baseUrl});
    });
  });

  router.get('/ip', function(req, res, next) {
    var clientIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    console.log(clientIp);

    console.log(req);
  });
});

module.exports = router;
