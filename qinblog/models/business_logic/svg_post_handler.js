var fs = require('fs');
var path = require('path');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// This function search the posts path and get the svg file
module.exports = {svg_post_handler : function (postName, func) {
    var filePath = '/home/ruogu/posts/' + postName;
    var dirList = fs.readdir(filePath, function(err,res) {
      var retJSON = retJSON || {} ;
      var counter = 0;

      function retValCallback(data, func) {
        counter++;
        if(counter == 3) {
          func(data);
        }
      }

      var i = 0;
      while(i < res.length) {
        var extname = path.extname(res[i]);
        console.log(extname);
        if('.svg' == extname) {
          fs.readFile(filePath + '/' + res[i],'utf8', function(error, data) {
            retJSON.html = data;
            retValCallback(data, func);
          });
        } else if('.css' == extname) {
          fs.readFile(filePath + '/' + res[i],'utf8', function(error, data) {
            retJSON.css = data;
            retValCallback(data, func);

          });
        } else if('.js' == extname) {
          fs.readFile(filePath + '/' + res[i],'utf8', function(error, data) {
            retJSON.js = data;
            retValCallback(data, func);
          });
        }
        i++;
      }
    });
  }
}


//global.handlers = svg_post_handler;
