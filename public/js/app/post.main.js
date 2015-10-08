/**
* Created by Roger on 6/3/2015.
*/
require(['jquery', 'hljs' ], function ($, hljs) {
  "use strict";

  $(function () {
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
