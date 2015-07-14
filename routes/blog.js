/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
//var monk = require('monk');
//var db = monk('mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog');
var url = require('url');
var router = express.Router();
var post = require('./post');
var utils = require('../models/business_logic/utils/utils.js');

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';
var POST_PER_PAGE = 4;

mongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('posts');

  router.get('/page/[1-9]+/',function(req, res, next) {
      var pathname = url.parse(req.url).pathname;
      var page = pathname.substring(pathname.lastIndexOf('/') + 1);
      var baseUrl = req.protocol + "://" + req.get('host');
      var options = {
        sort:{id: -1},
        limit : POST_PER_PAGE,
        skip: (parseInt(page) - 1) * POST_PER_PAGE
      };
      collection.find({},options).toArray(function(e, data) {
          for(var i = 0; i < data.length; ++i) {
            data[i].imgUrls = utils.extract_image_href(data[i].content);
            data[i].content = utils.remove_image_href(data[i].content).substr(0, 200);
          }

          res.render('blog', {posts:data, baseUrl:baseUrl});
      });
  });


  router.get('/blog_count', function(req, res, next) {
    collection.count(function(err, count) {
      res.send({count: count});
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
