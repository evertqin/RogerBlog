var fs = require('fs');


String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function getPost(postId, func) {
  var postName = 'post' + postId;
  var filePath = '/home/ruogu/posts/' + postName;
  var dirList = fs.readdir(filePath, function(err,res) {
    var i = 0;
    while(i < res.length) {
      if(res[i].endsWith('svg')) {
        fs.readFile(filePath + '/' + res[i],'utf8', function(error, data) {
          func(data);
        });
      }
      i++;
    }
  });
}

getPost(1, function(data) {
  console.log(data);
});
