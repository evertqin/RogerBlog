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
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
            cwd:'public/js',
            src:['**/*.jsx'],
          dest:'public/build/js/',
          rename: function(dest, src) {
              return dest + src.substring(0, src.indexOf('.jsx')) + '.js';
            }
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


    watch:{
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['copy:dev:js'],
        options: {
          spawn: false,
        },
      },
      jsx: {
        files: ['public/js/**/*.jsx'],
        tasks:['babel'],
        options: {
          spawn:false,
        }
      },
      css: {
        cwd:'public/stylesheets',
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      }
    },

    copy:{
      dev:{
        files:[
          {
            expand:true,
            cwd:'public/stylesheets/lib',
            src:['**/*.css'],
            dest:'public/build/stylesheets',
          },
          {
            expand: true,
            cwd:'public/js',
            src:['**/*.js'],
            dest:'public/build/js',
          },
          {
            expand: true,
            cwd:'public/images',
            src:['**/*.*'],
            dest:'public/build/images',
          }
        ]

      },

      deploy:{
        files:[
          {
            expand:true,
            cwd:'public/stylesheets/lib',
            src:['**/*.css'],
            dest:'public/build/stylesheets',
          },
          {
            expand:true,
            cwd: '.',
            src: ['*','**/*.*', '!/editor/**', '!**/grunt*','!**/node_modules/*'],
            dest: '../blog',
          },
        ]
      }
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-babel');


  grunt.registerTask('default',['watch']);
  grunt.registerTask('dev', ['sass','copy:dev', 'babel']);
  grunt.registerTask('deploy', ['clean','babel','uglify','sass','cssmin','imagemin','copy:deploy', 'shell']);

};
