//#############################
//  Imports
//#############################
var express = require('express');
var router = express.Router();
var https = require('https');
var utils = require('../models/business_logic/utils/utils.js');
var logger = require('../models/logging/logger.js');
var mongoClient = require('mongodb').MongoClient;
var redisClient = require('../models/redis/redis.js');
var imageHandler = require('../models/business_logic/images/imgur_handler');
var request = require('request');




function getAccessToken() {

}

router.get('/', function(req, res, next) {
  res.render('photography');
});

router.get('/access_token', function(req, res, next) {
  var instagramInfo = (function() {
    var instagramClientId = '98cda8148a3247acb2f8a6341d329779';
    var instagramSecrete = '3f71407150094db3a29c355e4f339943';
    var instagramCode = '278dd6f3a00c4ec6bc965618c398a86b';
    return {
      client_id: instagramClientId,
      client_secret: instagramSecrete,
      grant_type: "authorization_code",
      redirect_uri: "http://blog.tripplan.info",
      code: instagramCode,
    };
  })();

  var instagramProfileUrl = "https://api.instagram.com/v1/users/234014569/media/recent/";

  var options = {
    url: instagramProfileUrl,
    qs: {
      client_id:'98cda8148a3247acb2f8a6341d329779',
    },
  };
  request.get(options, function(err, r, body){
    if(r.statusCode === 200){
      // get all images
      //var nextPageUrl = body.pagination.next_url;
      var data = typeof body === 'string' ? JSON.parse(body): body;
      var ret = [];
      var images = [];
      if(!!data.data && data.data.length > 0){
        for(var i = 0; i < data.data.length; ++i){
          var thisData = data.data[i];
          //var thumbnail = thisData.images.thumbnail;
          var fullImage = thisData.images.standard_resolution;
          //var timeStamp = thisData.caption ? thisData.caption.created_time: "";
          //var text = thisData.caption ? thisData.caption.text : "";
          // ret.push({
          //   thumbnail: thumbnail,
          //   text: text,
          //   timeStamp:timeStamp,
          //   fullImage:fullImage
          // });
          images.push({
            src: fullImage.url,
            w:fullImage.width,
            h: fullImage.height
          });
        }
      }
      res.send(images);

    }
  });
});

module.exports = router;
