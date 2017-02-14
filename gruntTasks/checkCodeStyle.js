module.exports = grunt => {

  grunt.registerTask('checkCodeStyle', () => {

    // Load dependency
    grunt.loadNpmTasks('grunt-jscs');

    grunt.config('jscs', {
      src: [
        'target/*/*.js',
        '!target/*/*.min.js',
        'target/**/*.js',
        '!target/**/*.min.js'
      ],
      options: {
        config: '.jscsrc'
      }
    });

    grunt.task.run('jscs');

  });

};
