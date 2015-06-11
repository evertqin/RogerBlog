var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
/* GET home page. */
router.get('/', function (req, res, next) {
  var collection = db.get('posts');
  collection.find({},function(e, docs) {
      res.render('index', {posts:docs});
  });
});

module.exports = router;
