/**
 * Created by Roger on 5/29/2015.
 */

(function($) {
    $(document).ready(function() {
        $('input[name="submit"]').click(function() {
            // The following code snippet demonstrate how to send a get request to the server
            // TODO: will comment out the following in the future
            var content = {test: $('input[name="fname"]').val()};
            console.log(content);

            $.get('/blog/test', content, function(data) {
                $('#result').html(data);
            });
            // The following demonstrate how to send an ajax request and get back data from server
            $.ajax('/blog/trial', {sample:"test"}).done(function(data) {
                console.log(data);
            });

            $.get('/blog/userlist', content, function(data) {
                for(var i = 0; i < data.userlist.length; ++i) {
                    $('#result').html(data.userlist[i].email);
                    console.log(data.userlist[i].email);
                }
            });
        });

    });
})(jQuery);