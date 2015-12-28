//Load common code that includes config, then load the app logic for this page.
requirejs(['./common'], function (common) {
    requirejs(['/build/js/app/photography/photography.main.js']);
    requirejs(['/build/js/app/photography/imageFrame.js']);

});
