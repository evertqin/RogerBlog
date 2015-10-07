document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  });
require(['jquery'], function ($) {
  "use strict";


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
