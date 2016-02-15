/**
 * Created by Roger on 6/3/2015.
 */

window.$ = window.jQuery = require("jquery");

$(function() {
  'use strict';

  require('bootstrap');
  $(function() {
    $('#navigation-items li>a').each(function() {
      var orgHref = $(this).attr('href');
      if (orgHref.startsWith('#')) {
        $(this).attr('href', '/' + orgHref);
      }
    });
  }());

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('#navigation-items li>a').each(function() {
    var orgHref = $(this).attr('href');
    if (orgHref.startsWith('#')) {
      $(this).attr('href', '/' + orgHref);
    }
  });
});