/**
* Created by Roger on 5/29/2015.
*/

(function ($) {
  $(window).load(function() {
    $(".loader").fadeOut("slow");
  });

  // angularjs controller
  (function() {
    var blog = angular.module('blogApp', ['ngRoute', 'ngResource']);
    //
    blog.controller('tagListCtrl', function($scope, $http) {
      $http.get('/blog/tag_list').success(function(data) {
        $scope.tagList = data.tag_list;
        console.log(data.tag_list);
      });
    });
  })();

  $(document).ready(function () {
    if(typeof String.prototype.firstLetterCapitalize != 'function') {
      String.prototype.firstLetterCapitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };
    }

    if(typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
      };
    }

    (function () {
      $('#navigation-items li>a').each(function() {
        var orgHref = $(this).attr('href');
        if(orgHref.startsWith('#')) {
          $(this).attr('href', '/' + orgHref);
        }
      });
    }());

    // the code module is used to hide text when they get too long
    (function () {
      var showChar = 200; //
      var ellipsestext = '...';
      var moretext = 'more';
      var lesstext = 'less';

      $('.more').each(function () {
        var content = $(this).html();
        $(this).html(content);
        if (content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar - 1, content.length - showChar);
          var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
          $(this).html(html);
        }
      });
    }());

    //info about pagination: http://flaviusmatis.github.io/simplePagination.js/
    var POST_PER_PAGE = 4;
    var url = '/blog/blog_count/';
    var tokens = window.location.href.split('/');
    if(tokens[tokens.length - 2] !== "page") {
      url += tokens[tokens.length - 2];
    }

    $.ajax(url).done(function(data) {
      $(function() {
        $('.pagination').pagination({
          items: data.count,
          itemsOnPage: POST_PER_PAGE,
          cssStyle: 'light-theme',
          hrefTextPrefix:"",
          displayedPages:10,
          currentPage:window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
        });
      });
    });
  });
})(jQuery);
