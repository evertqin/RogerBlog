/**
 * Created by Roger on 6/3/2015.
 */
var express = require('express');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("in post");
    res.render('post');
});

module.exports = router;
