var utils = utils || {}

utils.extract_image_href = function(content) {
  var re = /<img.*?(?=<\/)/g;
  var imgs = re.exec(content);

var srcRe = /src=\"(.*?(?=\"))/;
  var links = [];
  while(imgs != null) {
    var link = srcRe.exec(imgs[0]);
    if(link != null) {
      links.push(link[1]);
    }
    imgs = re.exec(content);

  }
  return links;
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
//utils.extract_image_href('<img src="dsds" dsds/></img><img src="dsddsdss" dsds/></img>');
