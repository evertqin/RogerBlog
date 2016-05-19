/**
 * Created by Roger on 5/29/2015.
 */
 //#############################
 //  Constants
 //#############################
 var POST_PER_PAGE = 10;
 var CONTENT_LENGTH_LIMIT = 300;
 var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';
 //#############################
 //  Imports
 //#############################
var express = require('express');
var url = require('url');
var router = express.Router();
var post = require('./post');
var utils = require('../models/business_logic/utils/utils.js');
var logger = require('../models/logging/logger.js');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var logger = require('../models/logging/logger.js');
var entryUtiles = require('../models/business_logic/entries/entry_utils.js');


mongoClient.connect(mongoUrl, function(err, db) {
  if(err !== null){
      logger.error(err);
      throw err;
  }

  var collection = db.collection('posts');

  // This one is used to get certain page of all documents
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
            data[i].content = utils.getFirstSeveralPTags(data[i].content).substr(0, CONTENT_LENGTH_LIMIT);
          }
          res.render('blog', {posts:data, baseUrl:baseUrl});
      });
  });

  // This one is used to get certain page of given category
  router.get('/page/[a-z]+/[1-9]+', function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var baseUrl = req.protocol + "://" + req.get('host');
    var tokens = pathname.split('/');
    var category = tokens[2];
    var page = tokens[3];

    var options = {
      sort : {id: -1},
      limit:POST_PER_PAGE,
      skip: (parseInt(page) - 1) * POST_PER_PAGE
    };

    var re = new RegExp("^" + category + "$", 'i');
    collection.find({tag: re}, options).toArray(function(err, data) {
      for(var i = 0; i < data.length; ++i) {
        //data[i].imgUrls = utils.extract_image_href(data[i].content);
        data[i].content = utils.remove_image_href(data[i].content).substr(0, 200);
      }
      res.render('blog', {posts:data, baseUrl:baseUrl});
    });
  });

  router.get('/blog_count/[a-z]*', function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    var baseUrl = req.protocol + "://" + req.get('host');
    var tokens = pathname.split('/');
    var category = tokens[2];

    var re = new RegExp("^" + category + "$", 'i');
    collection.count({tag: re}, function(err, count) {
      res.send({count: count});
    });
  });


  router.get('/all_entries/organized/[a-z]*', function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    logger.info("Getting the list ");
    var tokens = pathname.split('/');

    if(tokens.length  != 4){
      res.render('error', {message:"Something is wrong"});
      return;
    }

    switch(tokens[3]) {
      case 'time':
      entryUtiles.getAllEntries(collection, function(err, data){
        res.send(data);
      });
        break;
      default:
        break;
    }

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

  router.get('/date_sorted_list', function(req, res, next){
    collection.find({}).toArray(function(e, docs){
      utils.summary_date(docs);
    });
  });

});


router.use('/post', post);

module.exports = router;
