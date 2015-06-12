// namespace handlers
var fs = require('fs');
var path = require('path');

var handlers = handlers || {};

handlers.handlers_map = (function(filename){
  var filePath = path.resolve(__dirname, filename);
  var content = fs.readFileSync(filePath, 'utf8');
  var splitted = content.trim().split('\n');

  var map = {};
  for(var i = 0; i < splitted.length;++i) {
    var tokens = splitted[i].trim().split(',');
    if(tokens.length != 2) {
      throw "The length of splitted should be 2, please check your config file.";
    }

    var postName = tokens[0].trim();
    var postHandler = tokens[1].trim();
    map[postName] = postHandler;
  }


  return map;

})('../constants/handlers_map');
//require('svg_post_handler');
handlers.routePost = function(postName) {
  console.log(this.handlers_map[postName]);
  return require('./' + this.handlers_map[postName])[this.handlers_map[postName]];
};

handlers.routePost('post1')('post1', function(data) {
  console.log(data);
});
