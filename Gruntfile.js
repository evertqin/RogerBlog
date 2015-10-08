module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['build'],

        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dynamic_mapping: {
              files: [{
                expand:true,
                cwd:'public/stylesheets',
                src:['*.scss'],
                dest:'public/build/stylesheets',
                ext:'.css',
              }]
            }
        },
        cssmin:{
          dynamic_mapping: {
              files: [{
                expand:true,
                cwd:'public/build/stylesheets',
                src:['*.css'],
                dest:'public/build/stylesheets',
                ext:'.css',
              }]
            }
        },

        uglify: {
            dynamic_mapping: {
                files: [
                    {
                    expand: true,
                    cwd:'public/js',
                    src:'**/*.js',
                    dest:'public/build/js',
                    ext:'.js',
                    extDot: 'last'
                    },
                ],
            },
        },

        copy:{
          main: {

          },
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Default task(s).
    grunt.registerTask('default', ['uglify','sass','cssmin']);

};
