/**
 * Created by Roger on 5/23/2015.
 */

(function ($) {
    $(document).ready(function () {
        $(window).scroll(function () {
            var height = $(window).scrollTop();
            //if($(window).width() > 768) {
            //    if (height == 0) {
            //        $(".navbar-default").removeClass("sticky-scrolling");
            //        $(".social-network-above-navbar").removeClass("sticky-top");
            //    } else {
            //        $(".navbar-default").addClass("sticky-scrolling");
            //        $(".social-network-above-navbar").addClass("sticky-top");
            //    }
            //}

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

        function hideLongLine(tag, showChar) {
          var ellipsestext = '...';
          var moretext = 'more';
          var lesstext = 'less';
          $(tag).each(function() {
            var content = $(this).html();
            if (content.length > showChar) {
                var c = content.substr(0, showChar);
                var h = content.substr(showChar - 1, content.length - showChar);
                var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
                $(this).html(html);
            }
          });
        }
        hideLongLine('.more', 45);
        hideLongLine('.box-title', 25);


        // (function () {
        //     var showChar = 50; //
        //     var ellipsestext = '...';
        //     var moretext = 'more';
        //     var lesstext = 'less';
        //
        //     $('.more').each(function () {
        //       // first need to remove special tags
        //         var content = $(this).html();
        //         if (content.length > showChar) {
        //             var c = content.substr(0, showChar);
        //             var h = content.substr(showChar - 1, content.length - showChar);
        //             var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
        //             $(this).html(html);
        //         }
        //     });
        //
        // }());
    });
})(jQuery);
