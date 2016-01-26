'use strict';
var $ = require('jquery');
$(function() {
var angular = require('angular');

var mainApp = angular.module('mainApp', []);
// bootstrap angular here, notice we need to apply directive before bootstraping
//mainApp.init = function() {
//    angular.bootstrap(document, ['mainApp']);
//};

mainApp.controller('backgroundController', ['$scope',function($scope){
}])
.factory('getImage', [function(imageUrls){
  function getImage(imageUrls){
    var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[selectedImageIdx];
  }

  return getImage;
}]);


module.exports = mainApp;
});
