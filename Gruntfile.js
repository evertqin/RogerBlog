module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['public/build'],
    watch: {
      index: {
        files: ["public/js/app/index/**/*.js", "public/js/app/index/**/*.jsx", "!public/js/**/__tests__/*"],
        tasks: ["browserify:index"]
      },
      post: {
        files: ["public/js/app/post/**/*.js", "public/js/app/post/**/*.jsx", "!public/js/**/__tests__/*"],
        tasks: ["browserify:post"]
      },
      blog: {
        files: ["public/js/app/blog/**/*.js", "public/js/app/blog/**/*.jsx", "!public/js/**/__tests__/*"],
        tasks: ["browserify:blog"]
      },
      photography: {
        files: ["public/js/app/photography/**/*.js", "public/js/app/photography/**/*.jsx", "!public/js/**/__tests__/*"],
        tasks: ["browserify:photography"]
      },

      common: {
        files: ["public/js/common/**/*.jsx", "public/js/common/**/*.js", "!public/build/**/*", "!public/js/**/__tests__/*"],
        tasks: ["browserify"],
      },
      css: {
        files: ["public/stylesheets/**/*.scss"],
        tasks: ["sass"]
      }
    },

    browserify: {
      options: {
        transform: [
          ["babelify", {
            presets: ["react", "es2015"]
          }]
        ],
        browserifyOptions: {
          debug: true
        }
      },
      index: {
        files: {
          "public/build/js/index/index-bundle.js": ["public/js/app/index/index.js"]
        }
      },
      blog: {
        files: {
          "public/build/js/blog/blog-bundle.js": ["public/js/app/blog/blog.js"]
        }
      },
      post: {
        files: {
          "public/build/js/post/post-bundle.js": ["public/js/app/post/post.js"]
        }
      },
      photography: {
        files: {
          "public/build/js/photography/photography-bundle.js": ["public/js/app/photography/photography.js"]
        }
      }

    },
    sass: {
      dynamic_mapping: {
        files: [{
          expand: true,
          cwd: 'public/stylesheets',
          src: ['*.scss'],
          dest: 'public/build/stylesheets',
          ext: '.css',
        }]
      }
    },

    cssmin: {
      dynamic_mapping: {
        files: [{
          expand: true,
          cwd: 'public/build/stylesheets',
          src: ['*.css'],
          dest: 'public/build/stylesheets',
          ext: '.css',
        }]
      }
    },
    uglify: {
      dynamic_mapping: {
        files: [{
          expand: true,
          cwd: 'public/build/js',
          src: '**/*.js',
          dest: 'public/build/js',
          ext: '.js',
          extDot: 'last'
        }, ],
      },
    },

    imagemin: {
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'public/images', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'public/build/images' // Destination path prefix
        }]
      }
    },



    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'public/stylesheets/lib',
          src: ['**/*.css'],
          dest: 'public/build/stylesheets',
        }, {
          expand: true,
          cwd: 'public/js',
          src: ['**/*.js'],
          dest: 'public/build/js',
        }, {
          expand: true,
          cwd: 'public/images',
          src: ['**/*.*'],
          dest: 'public/build/images',
        }]

      },

      deploy: {
        files: [
          {
          expand:true,
          src: ['**/*', '!**/editor/**', '!**/node_modules/**', '!**/public/js/**', '!**/public/stylesheets/**', "!**/scripts/**"],
          dest: '../blog',
        }, ]
      }
    },

    shell: {
      options: {
        execOptions: {
                maxBuffer: Infinity
            }
      },
      target: {
        command: 'cd ../blog; git add .; git commit -m "update";git push'

      }
    },
  });


  grunt.registerTask('default', ['sass', 'browserify']);
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('deploy', ['clean', 'browserify', 'sass', 'uglify', 'cssmin', 'imagemin', 'copy:deploy', 'shell']);

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-shell');
  //grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');


};
