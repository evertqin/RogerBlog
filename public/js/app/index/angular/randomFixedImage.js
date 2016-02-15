'use strict';
var $ = require('jquery');

$(function() {
var mainApp = require('./mainApp');
var constants = require('../../../constants/constants');

mainApp.directive('randomFixedImage', ['getImage', function(getImage){
  var link = function(scope, element, attrs){
    var url = getImage(constants.staticImageUrls);
    element.css({
      'background-image':'url(' + url + ')',
    });
  };
  return {
    restrict:'A',
    link: link
  };
}]);

module.exports = mainApp;
});

