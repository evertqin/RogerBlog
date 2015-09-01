/**
 * Created by Roger on 5/23/2015.
 */
(function ($) {
    $(window).load(function() {
      $(".loader").fadeOut("slow");
    });


    (function(){
      var staticImageUrls = constants.staticImageUrls;
      var mainApp = angular.module('mainApp', []);

      mainApp.controller('backgroundController', ['$scope', function($scope){
      }])
      .directive('randomImage', ['getImage',function(getImage){
        this.staticImageUrls = staticImageUrls;
        var link = function(scope, element, attrs){
          var url = getImage(this.staticImageUrls);
          element.css({
            'background-image':'url(' + url + ')',
          });
        };
        return {
          restrict:'A',
          link:link
        };
      }])
      .factory('getImage', [function(imageUrls){
        function getImage(imageUrls){
          var selectedImageIdx = Math.floor(Math.random() * imageUrls.length);
          return imageUrls[selectedImageIdx];
        }

        return getImage;
      }]);


    })();

    $(document).ready(function () {
        $(window).scroll(function () {
            var height = $(window).scrollTop();

            if (height > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        var $root = $('html, body');

        $('a[href="#totop"]').click(function () {
            $root.animate({scrollTop: 0}, 500);
            return false;
        });

        $("a").click(function() {
            var href = $( $.attr(this, 'href') );
            if(href.length) {
                $root.animate({
                    scrollTop: href.offset().top
                }, 500);
            }
            return false;
        });

        // For Parallax
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          // seems parallax does not work on mobile, I am diabling them now.
        } else {
          var s = skrollr.init({
            render: function (data) {
              //console.log(data.curTop);
            }
          });
        }


        // check if is chinese of not
        function isChinese(value) {
          var len = value.length;
          var cnChar = value.match(/[^\x00-\x80]/g);
          return cnChar !== null;
        }
        function hideLongLine(tag, showChar) {
          var ellipsestext = '...';
          var moretext = 'more';
          var lesstext = 'less';

          $(tag).each(function() {
            var content = $(this).html();
            var showCharLength = isChinese(content.substr(0, 100)) ? showChar /2 : showChar;

            if (content.length > showCharLength) {
                var c = content.substr(0, showCharLength);
                var h = content.substr(showCharLength - 1, content.length - showCharLength);
                var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
                $(this).html(html);
            }
          });
        }
        hideLongLine('.more', 120);
        hideLongLine('.box-title', 40);

    });
})(jQuery);
