/**
 * Created by Roger on 5/29/2015.
 */

(function ($) {
    $(document).ready(function () {
        //$('input[name="submit"]').click(function() {
        //    // The following code snippet demonstrate how to send a get request to the server
        //    // TODO: will comment out the following in the future
        //    var content = {test: $('input[name="fname"]').val()};
        //    console.log(content);
        //
        //    $.get('/blog/test', content, function(data) {
        //        $('#result').html(data);
        //    });
        //    // The following demonstrate how to send an ajax request and get back data from server
        //    $.ajax('/blog/trial', {sample:"test"}).done(function(data) {
        //        console.log(data);
        //    });
        //
        //    $.get('/blog/userlist', content, function(data) {
        //        for(var i = 0; i < data.userlist.length; ++i) {
        //            $('#result').html(data.userlist[i].email);
        //            console.log(data.userlist[i].email);
        //        }
        //    });
        //});

        if(typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function(str) {
                return this.slice(0, str.length) == str;
            }
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
                if (content.length > showChar) {
                    var c = content.substr(0, showChar);
                    var h = content.substr(showChar - 1, content.length - showChar);
                    var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
                    $(this).html(html);
                }
            });
        }());

        // This following is used to update the fontend posts
        // now this is replaced by direct jade
        //(function() {
        //    $.ajax("/blog/blog_entries").done(function(data) {
        //        for(var i = 0; i < data.length; ++i) {
        //            $("#article" + i + " #title a").text(data[i].title);
        //            $("#article" + i + " .post-entry .content").text(data[i].content);
        //        }
        //    })
        //})();
        //console.log(posts);

    });
})(jQuery);