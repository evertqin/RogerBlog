//Load common code that includes config, then load the app logic for this page.
requirejs(['./common'], function (common) {
    requirejs(['/build/js/app/blog/blog.main.js']);
    requirejs(['/build/js/app/blog/blog_entries.js']);
    requirejs(['/build/js/app/blog/blog_pics.js']);
    requirejs(['/build/js/app/blog/blog_tagList.js']);

});
