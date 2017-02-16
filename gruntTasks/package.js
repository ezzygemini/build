const argument = require('argument');

module.exports = grunt => {

  grunt.registerTask('package', () => {

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.config('compress.project', {
      options: {
        archive: `package.zip`,
        pretty: true
      },
      files: [{
        src: [
          'target/*',
          'target/**',
          '!**/archive/**',
          '!**/*.bak*/**',
          '!**/scss/',
          '!**/*.scss',
          '!**/*.ai',
          '!**/*.psd',
          '!**/*.eps',
          '!**/*.idd'
        ]
      }]
    });

    grunt.task.run('compress');

  });

};
