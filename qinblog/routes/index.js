var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/blog', function (req, res, next) {
    console.log("Logging into blog");
    res.render('blog');
    next();
});

module.exports = router;
