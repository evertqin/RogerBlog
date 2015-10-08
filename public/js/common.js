//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
require.config({
    baseUrl: '/js/app',
    paths: {
        app: '.',
        jquery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular",
        skrollr: "https://cdnjs.cloudflare.com/ajax/libs/skrollr/0.6.30/skrollr.min",
        hljs:"//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/highlight.min",
        bootstrap:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
        simplePagination:"/js/lib/jquery.simplePagination",
        count:"/js/lib/count",
        smoothscroll:"/js/lib/smoothscroll",
        'header-scroll': "/js/lib/header-scroll",
        utils: "./lib/utils",
        constants: "../constants/constants"
    },
    // angular does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      exports: 'angular'
    },
    'bootstrap':{
      deps:['jquery']
    },
    'header-scroll':{
      deps:['jquery']
    }
  },
});

require(["smoothscroll", "bootstrap", 'header-scroll', 'count']);
