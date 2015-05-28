/**
 * Created by Roger on 5/23/2015.
 */

(function($) {

    $(document).ready(function() {
        $(window).scroll(function() {
            var height = $(window).scrollTop();

            if(height == 0) {
                $(".navbar-default").removeClass("sticky-scrolling");
                $(".social-network-above-navbar").removeClass("sticky-top");
                $(".social-network-above-navbar").addClass("nonsticky-top");



            } else {


                $(".navbar-default").addClass("sticky-scrolling");
                $(".social-network-above-navbar").addClass("sticky-top");
                $(".social-network-above-navbar").removeClass("nonsticky-top");

            }

            if(height > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }

        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        var s = skrollr.init({
            render:function(data) {
                console.log(data.curTop);
            }
        });




    });



})(jQuery);





