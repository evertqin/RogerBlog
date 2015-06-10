/**
 * Created by Roger on 6/3/2015.
 */

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

(function ($) {
    $(document).ready(function () {
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

        var svgs = d3.select('svg');
        //console.log(svgs);
        if(svgs.length > 0) {


        //   var head = $('head');
        //    head.append('<script src="http://localhost:8000/main.js"</script>');
        //    head.append('<link rel="stylesheet" href="http://localhost:8000/main.css"</link>')
        //
        }

    });
})(jQuery);
