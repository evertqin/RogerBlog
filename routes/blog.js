/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://evertqin:QG3VGLyZlRWm@ds047632.mongolab.com:47632/blog');
var router = express.Router();
var post = require('./post');
var utils = require('../models/business_logic/utils/utils.js');

router.get('/',function(req, res, next) {
    var collection = db.get('posts');
    collection.find({},{sort:{id: -1}},function(e, data) {
        for(var i = 0; i < data.length; ++i) {
          data[i].imgUrls = utils.extract_image_href(data[i].content);
        }
        res.render('blog', {posts:data});

    });
});


router.get('/raw', function(req, res) {
    var collection = db.get('posts');
    collection.find({},function(e, docs) {
        res.send( {posts:docs});
    });
});

router.get('/blog_entries', function(req, res, next) {
    //console.log("Requesting blog entries");
    var collection = db.get('posts');
    collection.find({},{sort:{id: -1}},function(e, docs) {
        res.render('blog_entries', { title: 'Hey', message: 'Hello there!'});
        //res.render('blog_entries', {posts:docs, title:"Hello"});
    });
});

router.get('/tag_list', function(req, res, next){
  var collection = db.get('posts');
  collection.find({},function(e, docs) {
    var tags = utils.summary_category(docs);
      res.send( {tag_list:tags});
  });

});

router.use('/post', post);

module.exports = router;
