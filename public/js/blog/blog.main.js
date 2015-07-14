/**
* Created by Roger on 5/29/2015.
*/

(function ($) {
  $(window).load(function() {
    $(".loader").fadeOut("slow");
  });

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

    if(typeof String.prototype.firstLetterCapitalize != 'function') {
      String.prototype.firstLetterCapitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
    }

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
        //var re = /<img.*?>/gi;
      //  content = content.replace(re, '')
        $(this).html(content);
        if (content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar - 1, content.length - showChar);
          var html = c + '<span class="moreellipses">' + ellipsestext + ' </span>';
          $(this).html(html);
        }
      });
    }());

    $(".edit-button").on('click', function() {
      console.log("This is called");
    });

    $.ajax('/blog/tag_list').done(function(data) {
      for(var k in data.tag_list) {
        $('.blog-category-list .list-body ul').append('<li><a href="#">' +k.firstLetterCapitalize() + '</a></li>');
      }

    });

    //info about pagination: http://flaviusmatis.github.io/simplePagination.js/
    var POST_PER_PAGE = 4;
    $.ajax('/blog/blog_count').done(function(data) {
      $(function() {
        $('.pagination').pagination({
          items: data.count,
          itemsOnPage: POST_PER_PAGE,
          cssStyle: 'light-theme',
          hrefTextPrefix:"",
          displayedPages:10,
          currentPage:window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        });
      });
    });





  });
})(jQuery);
