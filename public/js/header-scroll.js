/**
 * Created by Roger on 5/30/2015.
 */
(function ($) {
    $(document).ready(function () {
        $(window).scroll(function () {
            var height = $(window).scrollTop();
            if ($(window).width() > 768) {
                if (height == 0) {
                    $(".navbar-default").removeClass("sticky-scrolling");
                    $(".social-network-above-navbar").removeClass("sticky-top");
                } else {
                    $(".navbar-default").addClass("sticky-scrolling");
                    $(".social-network-above-navbar").addClass("sticky-top");
                }
            }
        });
    });
})(jQuery);
