/**
* Created by Roger on 6/3/2015.
*/
var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var url = require('url');
var db = monk('localhost:27017/nodetest1');
var router = express.Router();
var path = require('path');

var collection = db.get('posts');
var handlers = require('../models/business_logic/handlers.js');



router.get('/', function (req, res, next) {
  var urlParts = url.parse(req.url, true);
  var query = urlParts.query;

  collection.findById(query.id, function(err, doc) {

    res.render('post', {post: doc});

  });
});

router.get('/item/*', function(req, res, next){
  var pathname = url.parse(req.url).pathname;
  var id = pathname.substring(pathname.lastIndexOf('/') + 1);
  collection.findById(id, function(err, doc) {
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

  collection.findById(id, function(err, doc) {
    handlers.routePost(path.basename(doc.folder_name))(doc.folder_name, function(data) {
      res.send(data);
    });
  });

});


// router.use(function (err, req, res, next) {
//     console.log(err);
// });

module.exports = router;
