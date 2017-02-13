const path = require('path');
const argument = require('argument');

module.exports = grunt => {

  grunt.registerTask('copyFiles', () => {

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-copy');

    const source = path.normalize(argument('source') + '/');

    grunt.log.writeln(`Copying files from: ${source}`);

    grunt.config('copy.project', {
      files: [
        {
          expand: true,
          src: [
            '../../nova/src/*',
            '../../nova/src/**'
          ],
          dest: 'build/',
          filter: 'isFile'
        }
      ]
    });

    grunt.task.run('copy');

  });

};
