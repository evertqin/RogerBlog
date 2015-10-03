/**
* Created by Roger on 6/3/2015.
*/

(function ($) {
  $(document).ready(function () {
    if(typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
      };
    }

    (function () {
      $('#navigation-items li>a').each(function() {
        var orgHref = $(this).attr('href');
        if(orgHref.startsWith('#')) {
          $(this).attr('href', '/' + orgHref);
        }
      });
    }());

    $('pre code').each(function(i, block) {
       hljs.highlightBlock(block);
     });


  });
})(jQuery);
