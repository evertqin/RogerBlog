define([],function() {
  var utils = utils || {};

  utils.imagePreloader = function(urls) {
      var loadImage = function(url){
        console.log('Loading URL ' + url);
          if(arguments.length !== 1){
            console.error("I only accept 1 url at a time");
            return;
          }

          var image = new Image();
          image.src = url;
          return image;
      };
      var result = {};
      urls.forEach(function(url){
        if(!result[url]){
          result[url] = loadImage(url);
        }
        return result[url];
      });

      return result;
  };

  return utils;
  // return function() {
  //   if(typeof string.prototype.startswith != 'function') {
  //     string.prototype.startswith = function(str) {
  //       return this.slice(0, str.length) == str;
  //     };
  //   }
  // };
});
