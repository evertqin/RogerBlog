'use strict';
var $ = require('jquery');

$(function() {
  var mainApp = require('./mainApp');
  var constants = require('../../../constants/constants');

  mainApp.directive('randomImage', ['$interval', 'getImage', '$animate', function($interval, getImage, $animate) {
    var link = function(scope, element, attrs) {
      var url = getImage(constants.staticImageUrls);
      element.css({
        'background-image': 'url(' + url + ')',
        'background-repeat': 'no-repeat',
      });

      var $progressbar, $bar, $elem, tick, percentTime;
      var time = 7;

      function progressBar(elem) {
        $elem = elem;
        buildProgressBar();
        start();
      }

      function buildProgressBar() {
        $progressbar = $("<div>", {
          id: "progressbar"
        });
        $bar = $("<div>", {
          id: "bar"
        });
        $progressbar.append($bar).prependTo($elem);
      }

      function start() {
        percentTime = 0;
        tick = $interval(interval, 10);
      }

      function interval() {
        percentTime += 1 / time;
        $bar.css({
          width: percentTime + '%'
        });

        if (percentTime >= 100) {
          percentTime = 0;
          url = getImage(constants.staticImageUrls);
          element.css({
            'background-image': 'url(' + url + ')',
          });
        }
      }

      progressBar($('#moving-strip'));
    };

    return {
      restrict: 'A',
      link: link
    };
  }]);
  module.exports = mainApp;

});