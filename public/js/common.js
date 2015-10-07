//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular",
        skrollr: "https://cdnjs.cloudflare.com/ajax/libs/skrollr/0.6.30/skrollr.min",
        simplePagination: "jquery.simplePagination",
    },
    // angular does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      exports: 'angular'
    }
  },
});
