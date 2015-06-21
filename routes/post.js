/**
* Created by Roger on 6/3/2015.
*/
var express = require('express');
//var monk = require('monk');
var url = require('url');
var router = express.Router();
var path = require('path');

var handlers = require('../models/business_logic/handlers.js');

//var db = monk('mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog')
//var collection = db.get('posts');

var mongo = require('mongodb');
 var mongoClient = mongo.MongoClient;
 var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';



mongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('posts');
  // router.get('/', function (req, res, next) {
  //   var urlParts = url.parse(req.url, true);
  //   var query = urlParts.query;
  //
  //   collection.findOne({_id:query.id}, function(err, doc) {
  //
  //     res.render('post', {post: doc});
  //
  //   });
  // });

  router.get('/item/*', function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    var id = pathname.substring(pathname.lastIndexOf('/') + 1);
    collection.findOne({_id: mongo.ObjectId(id)}, function(err, doc) {
      handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
        doc.raw = data != null && data.length > 0;
        res.render('post', {post: doc});
      });
    });

  });

  //var svg_post_handler = require('../models/business_logic/svg_post_handler.js');


  router.get('/raw/*', function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var id = pathname.substring(pathname.lastIndexOf('/') + 1);

    collection.findOne({_id: mongo.ObjectId(id)}, function(err, doc) {
      handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
        res.send(data);
      });
    });

  });

});

//
// router.get('/', function (req, res, next) {
//   var urlParts = url.parse(req.url, true);
//   var query = urlParts.query;
//
//   collection.findById(query.id, function(err, doc) {
//
//     res.render('post', {post: doc});
//
//   });
// });
//
// router.get('/item/*', function(req, res, next){
//   var pathname = url.parse(req.url).pathname;
//   var id = pathname.substring(pathname.lastIndexOf('/') + 1);
//   collection.findById(id, function(err, doc) {
//     handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
//       doc.raw = data != null && data.length > 0;
//       res.render('post', {post: doc});
//     });
//   });
//
// });
//
// //var svg_post_handler = require('../models/business_logic/svg_post_handler.js');
//
//
// router.get('/raw/*', function(req, res, next) {
//   var pathname = url.parse(req.url).pathname;
//   var id = pathname.substring(pathname.lastIndexOf('/') + 1);
//
//   collection.findById(id, function(err, doc) {
//     handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
//       res.send(data);
//     });
//   });
//
// });


// router.use(function (err, req, res, next) {
//     console.log(err);
// });

module.exports = router;
