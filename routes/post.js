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
 var mongoUrl = 'mongod' +
     'b://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog';



mongoClient.connect(mongoUrl, function(err, db) {
  var collection = db.collection('posts');

  router.get('/item/*', function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    console.log("yes");
    var id = pathname.substring(pathname.lastIndexOf('/') + 1);
    collection.findOne({_id: mongo.ObjectId(id)}, function(err, doc) {
      handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
        if(err == null) {
          doc.raw = data != null && data.length > 0;
          res.render('post', {post: doc});
        }
      });
    });

  });

  router.post('/comments', function(req, res, next) {

    var id = mongo.ObjectId(req.body.id);
    collection.findOne({_id: id}, function(err, doc){
      if(err == null) {
        doc.comments.push();
      }

      collection.update({_id: id},
        {$push: {comments: {name:req.body.commenter_name,
                  content: req.body.commenter_content}}});

    });

    res.end();
  });


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


module.exports = router;
