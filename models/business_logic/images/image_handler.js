// Default image handler

var Handler = function(){
  this.name = "generic Image handler";
  this.getImageUrls = null;

  this.sampleImages = [
  	'http://imgur.com/yFVQ1Jt',
  	'http://imgur.com/G9uvWuc',
  	'http://imgur.com/GDEnyX0'
  ];
};

module.exports = new Handler();
