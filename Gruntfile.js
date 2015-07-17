module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dynamic_mapping: {
                files: [
                    {
                    expand: true,
                    cwd:'public/js',
                    src:'**/*.js',
                    dest:'public/build/',
                    ext:'.min.js',
                        extDot: 'first'
                    },
                ],
            },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};
