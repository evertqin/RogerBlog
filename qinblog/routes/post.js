/**
 * Created by Roger on 6/3/2015.
 */
var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var url = require('url');
var db = monk('localhost:27017/nodetest1');
var router = express.Router();


var collection = db.get('posts');


router.get('/', function (req, res, next) {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;

    collection.findById(query.id, function(err, doc) {
        console.log(doc);
        res.render('post', {post: doc});
        next();
    });
});

var svg_post_handler = require('../models/business_logic/svg_post.js');

router.get('/svg', function(req, res, next) {
  svg_post_handler.handlers.getPost(1, function(data) {
    next();
  })
});


// router.use(function (err, req, res, next) {
//     console.log(err);
// });

module.exports = router;
