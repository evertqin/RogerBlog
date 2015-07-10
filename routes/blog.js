/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
//var monk = require('monk');
//var db = monk('mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog');
var router = express.Router();
var post = require('./post');
var utils = require('../models/business_logic/utils/utils.js');

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';


mongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('posts');

  router.get('/',function(req, res, next) {
      var baseUrl = req.protocol + "://" + req.get('host');
      collection.find({},{sort:{id: -1}}).toArray(function(e, data) {
          for(var i = 0; i < data.length; ++i) {
            data[i].imgUrls = utils.extract_image_href(data[i].content);
          }
          res.render('blog', {posts:data, baseUrl:baseUrl});

      });
  });


  router.get('/raw', function(req, res) {
      collection.find({}).toArray(function(e, docs) {
          res.send( {posts:docs});
      });
  });


  router.get('/tag_list', function(req, res, next){
    collection.find({}).toArray(function(e, docs) {
      var tags = utils.summary_category(docs);
        res.send( {tag_list:tags});
    });

  });
});


router.use('/post', post);

module.exports = router;
