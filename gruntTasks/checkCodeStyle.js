module.exports = grunt => {

  grunt.registerTask('checkCodeStyle', () => {

    // Load dependency
    grunt.loadNpmTasks('grunt-jscs');

    grunt.config('jscs', {
      src: [
        'src/**/*.js',
        '!src/**/*.min.js'
        // ,
        // '!src/assets/dist/**/*.js',
        // '!src/assets/libs/**/*.js'
      ],
      options: {
        config: true
      }
    });

    grunt.task.run('jscs');

  });

};
