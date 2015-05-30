/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
var router = express.Router();
// support for mongodb
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

router.get('/',function(req, res, next) {
    console.log("Blogdddd");

});

router.get('/test', function(req, res, next) {
   console.log(req.query.test);
});

router.get('/trial', function(req, res, next) {
   console.log(req.query.sample);
    res.send({iii:"dsds"});
});

router.get('/userlist', function(req, res, next) {
    var collection = db.get('usercollection');
    collection.find({},function(e, docs) {
        res.send({userlist:docs});
    });
});

module.exports = router;