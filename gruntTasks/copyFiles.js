const argument = require('argument');

module.exports = grunt => {

  grunt.registerTask('copyFiles', () => {

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.file.delete('./target');

    grunt.config('copy.project', {
      files: [
        {
          expand: true,
          cwd: argument('BUILD_SOURCE', '../src/'),
          src: ['*', '**'],
          dest: './target/',
          filter: 'isFile'
        }
      ]
    });

    grunt.task.run('copy');

  });

};
