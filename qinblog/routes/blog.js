/**
 * Created by Roger on 5/29/2015.
 */
var express = require('express');
var router = express.Router();

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
module.exports = router;