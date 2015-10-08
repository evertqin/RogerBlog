define(['./mainApp', 'constants'], function(mainApp, constants){
  'use strict';

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

  return mainApp;
});
