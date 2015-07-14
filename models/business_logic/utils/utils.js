var htmlparser = require("htmlparser2");



var utils = utils || {}

utils.extract_image_href = function(content) {
  var links = [];
  var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
      if(name === "img" ){
        links.push(attribs.src);
      }
    }
  }, {decodeEntities: true});

  parser.write(content);
  parser.end();
  return links;
}

utils.remove_image_href = function(content) {
  var result;
  return content.replace(/<img.*?\/>/g, "");
}

utils.summary_category = function(posts) {
  var hashSet = {};
  for(var i = 0; i < posts.length; ++i) {
    posts[i].tag.forEach(function(element) {
      hashSet[element] = element in hashSet ? hashSet[element] + 1 : 1
    });
  }
  return hashSet;
}



module.exports = utils;
