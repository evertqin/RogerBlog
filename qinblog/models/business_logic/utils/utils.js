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
  console.log(links);
  return links;
}


module.exports = utils;
//utils.extract_image_href('<img src="dsds" dsds/></img><img src="dsddsdss" dsds/></img>');
