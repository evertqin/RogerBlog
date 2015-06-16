/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var router = express.Router();
var post = require('./post');

router.get('/',function(req, res, next) {
    var collection = db.get('posts');
    collection.find({},{sort:{id: -1}},function(e, docs) {
        res.render('blog', {posts:docs});
    });
});




router.get('/raw', function(req, res) {
    var collection = db.get('posts');
    collection.find({},function(e, docs) {
        res.send( {posts:docs});
    });
});

router.get('/test', function(req, res, next) {
   console.log(req.query.test);
});

router.get('/trial', function(req, res, next) {
   console.log(req.query.sample);
    res.send({iii:"dsds"});
});

router.get('/blog_entries', function(req, res, next) {
    //console.log("Requesting blog entries");
    var collection = db.get('posts');
    collection.find({},{sort:{id: -1}},function(e, docs) {
        res.render('blog_entries', { title: 'Hey', message: 'Hello there!'});
        //res.render('blog_entries', {posts:docs, title:"Hello"});
    });
});

router.use('/post', post);

module.exports = router;
