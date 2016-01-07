/**
* Created by Roger on 6/3/2015.
*/
'use strict';

var $ = require('jquery');

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

$('#navigation-items li>a').each(function() {
  var orgHref = $(this).attr('href');
  if(orgHref.startsWith('#')) {
    $(this).attr('href', '/' + orgHref);
  }
});

