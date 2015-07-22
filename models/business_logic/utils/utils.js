var htmlparser = require("htmlparser2");



var utils = utils || {};

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
};

utils.remove_image_href = function(content) {
  return content.replace(/<img.*?>/g, "");
};

utils.get_first_several_p_tags = function(content) {
  var pContent = [];
  var ispTag = false;
  var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
      if(name === "p" ){
        ispTag = true;
      }
    },
    ontext: function(text){
      if(ispTag) {
        pContent.push(text);
      }
    },
    onclosetag: function(tagname){
        if(tagname === "p"){
          ispTag = false;
        }
    }
  }, {decodeEntities: true});

  parser.write(content);
  parser.end();
  return pContent.join();
};

utils.summary_category = function(posts) {
  var hashSet = {};

  function loopTag(element) {
    hashSet[element] = element in hashSet ? hashSet[element] + 1 : 1;
  }

  for(var i = 0; i < posts.length; ++i) {
    posts[i].tag.forEach(loopTag);
  }
  return hashSet;
};



module.exports = utils;
