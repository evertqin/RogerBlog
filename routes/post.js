/**
* Created by Roger on 6/3/2015.
*/
var express = require('express');
var url = require('url');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var handlers = require('../models/business_logic/handlers.js');

var mongo = require('mongodb');
 var mongoClient = mongo.MongoClient;
 var mongoUrl = 'mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';



mongoClient.connect(mongoUrl, function(err, db) {

  if(err !== null){
    console.error(err);
    return;
  }

  var collection = db.collection('posts');

  router.get('/item/*', function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    var id = pathname.substring(pathname.lastIndexOf('/') + 1);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    collection.findOne({id: parseInt(id)}, function(err, doc) {
      if(err === null){
        handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
          if(err === null) {
            doc.raw = data !== undefined && data.length > 0;
            res.render('post', {post: doc, fullUrl : fullUrl});
          }
        });
      } 
    });

  });

  router.get('/raw/*', function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var id = pathname.substring(pathname.lastIndexOf('/') + 1);

    collection.findOne({id: parseInt(id)}, function(err, doc) {
      if(err === null){
        handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
          res.send(data);
        });
      }

    });
  });
});

module.exports = router;
