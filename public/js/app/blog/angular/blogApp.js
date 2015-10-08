define(['angular', 'constants'], function(angular, constants){
  // angularjs controller
    var blogApp = angular.module('blogApp', []);
    //

    blogApp.init = function() {
      angular.bootstrap(document, ['blogApp']);
    };

    blogApp.controller('tagListCtrl', ['$scope','$http', function($scope, $http) {
      $http.get('/blog/tag_list').success(function(data) {
        $scope.tagList = data.tag_list;
      });
    }])
    .controller('blogImageController', ['$scope', 'getImage', function($scope, getImage){
      $scope.defaultImgSrc = getImage(constants.staticImageUrls);

    }])
    .factory('getImage', [function(imageUrls){
      function getImage(imageUrls){
        var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[selectedImageIdx];
      }

      return getImage;
    }]);

    return blogApp;




});
