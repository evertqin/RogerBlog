module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['public/build'],


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

    imagemin:{
      dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'public/images',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'public/build/images'                  // Destination path prefix
      }]
      }
    },

    copy:{
      css:{
        expand:true,
        cwd:'public/stylesheets/lib',
        src:['**/*.css'],
        dest:'public/build/stylesheets',
      },
      // images: {
      //   expand:true,
      //   cwd:'public/images',
      //   src:['**/*.*'],
      //   dest:'public/build/images',
      // },

      production: {
        expand:true,
        cwd: '.',
        src: ['*','**/*.*', '!/editor/**'],
        dest: '../blog',
      },
    },

    shell:{
      options:{
        maxBuffer: 4096
      },
      target: {
        command: 'cd ../blog; git add .; git commit -m "update";git push'

      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('default', ['clean','uglify','sass','cssmin','imagemin', 'copy','shell']);

};
