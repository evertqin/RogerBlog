var fs = require('fs');
var path = require('path');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


module.exports = {generic_handler : function (filePath, func) {
  console.log("In generic_handler");
  filePath = path.normalize(__dirname + "/../" + filePath);
  fs.readdir(filePath, function(err,res) {
    var retJSON = retJSON || {} ;
    var counter = 0;
    var isFound = false;
    if(res === null) {
      func();
      return;
    }
    var i = 0;


    function callback(error, data) {
      func(data);
    }

    while(typeof res !== 'undefined' && i < res.length) {
      var extname = path.extname(res[i]);
      if('.html' == path.extname(res[i])) {
        isFound = true;
        fs.readFile(filePath + '/' + res[i],'utf8', callback);
        break;
      }
      i++;
    }
    if(!isFound) {
      func();
    }
  });
}};
