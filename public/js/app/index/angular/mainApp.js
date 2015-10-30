define(['angular'], function(angular){
  'use strict';

  var mainApp = angular.module('mainApp', []);

  // bootstrap angular here, notice we need to apply directive before bootstraping
  mainApp.init = function() {
      angular.bootstrap(document, ['mainApp']);
  };

  mainApp.controller('backgroundController', ['$scope',function($scope){
  }])
  .factory('getImage', [function(imageUrls){
    function getImage(imageUrls){
      var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[selectedImageIdx];
    }

    return getImage;
  }]);

  return mainApp;
});
