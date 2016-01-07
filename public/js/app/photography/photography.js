'use strict';

var $ = require('jquery');
$(function() {
  require('../../common/header-scroll');
  var constants = require('../../constants/constants');

  var instagramClientId = '98cda8148a3247acb2f8a6341d329779';
  var instagramCode = '278dd6f3a00c4ec6bc965618c398a86b';

  var imageUrls = constants.staticImageUrls;
  require('./components/imageFrame.jsx');
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



  });
});