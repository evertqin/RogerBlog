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
        var s = skrollr.init({
            render: function (data) {
                //console.log(data.curTop);
            }
        });
    });
})(jQuery);





