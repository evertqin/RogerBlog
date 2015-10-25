
require(['jquery','constants'], function ($, constants) {
  "use strict";

  var imageUrls = constants.staticImageUrls;
  $(window).ready(function(){

    $(".loader").fadeOut("fast");

    if(typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
      };
    }

    $('#navigation-items li>a').each(function() {
      var orgHref = $(this).attr('href');
      if(orgHref.startsWith('#')) {
        $(this).attr('href', '/' + orgHref);
      }
    });
  });

});
