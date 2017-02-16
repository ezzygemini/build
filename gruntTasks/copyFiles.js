const argument = require('argument');
const buildSrc = argument('BUILD_SOURCE', '../../');

module.exports = grunt => {

  grunt.registerTask('copyFiles', () => {

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-copy');

    if (grunt.file.exists('./target')) {
      grunt.file.delete('./target');
    }

    let copyFiles = ['*', '**'];
    if (grunt.file.exists(buildSrc + '/.buildignore')) {
      const ignoredFiles = grunt.file.read(buildSrc + '/.buildignore')
        .toString().split(/[\n\s]+/)
        .filter(row => row && !/^#.*$/.test(row))
        .map(row => '!' + row);
      grunt.log.writeln('Ignored files to copy:');
      grunt.log.writeln(ignoredFiles);
      copyFiles = copyFiles.concat(ignoredFiles);
    }

    grunt.log.writeln('Files to copy:');
    grunt.log.writeln(copyFiles);

    grunt.config('copy.project', {
      files: [
        {
          expand: true,
          cwd: buildSrc,
          src: copyFiles,
          dest: './target/',
          filter: 'isFile'
        }
      ]
    });

    grunt.task.run('copy');

  });

};
