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

utils.getFirstSeveralPTags = function(content) {
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
  return utils.escapeHtml(pContent.join());
};

utils.escapeHtml = function(txt) {
  txt = txt.replace('&', '&amp;');
  txt = txt.replace('<', '&lt;');
  txt = txt.replace('>', '&gt;');
  txt = txt.replace('"', '&quot;');
  return txt;
};

utils.summary_category = function(posts) {
  var hashSet = {};

  function loopTag(element) {
    hashSet[element] = element in hashSet ? hashSet[element] + 1 : 1;
  }

  for(var i = 0; i < posts.length; ++i) {
    if(typeof posts[i].tag === 'undefined') {
      console.log(posts[i]);
      continue;
    }
    posts[i].tag.forEach(loopTag);
  }
  return hashSet;
};

utils.get_current_date_time = function() {
    var now = moment();
    var formatted = now.format('YYYY-MM-DD HH:mm:ss Z');

    return formatted;
};



module.exports = utils;
