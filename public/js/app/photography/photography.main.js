require(['jquery', 'constants', 'photoswipe', 'photoswipeUI'], function($, constants, PhotoSwipe, PhotoSwipeUI_Default) {
  "use strict";
  var instagramClientId = '98cda8148a3247acb2f8a6341d329779';
  var instagramCode = '278dd6f3a00c4ec6bc965618c398a86b';

  var imageUrls = constants.staticImageUrls;
  $(window).ready(function() {

    $(".loader").fadeOut("fast");

    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
      };
    }

    $('#navigation-items li>a').each(function() {
      var orgHref = $(this).attr('href');
      if (orgHref.startsWith('#')) {
        $(this).attr('href', '/' + orgHref);
      }
    });

  //  var pswpElement = document.querySelectorAll('.pswp')[0];

    // // build items array
    // $.ajax({
    //   url: '/photography/access_token',
    //   type: 'GET',
    //   success: function(items){
    //     // define options (if needed)
    //     var options = {
    //       // optionName: 'option value'
    //       // for example:
    //       index: 0 // start at first slide
    //     };
    //     // Initializes and opens PhotoSwipe
    //     var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    //     gallery.init();
    //   }
    // });




  });

});
