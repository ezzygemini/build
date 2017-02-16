const argument = require('argument');
module.exports = grunt => {

  grunt.registerTask('updateVersion', () => {

    // Load dependency.
    grunt.loadNpmTasks('grunt-version');

    const pkg = argument('PACKAGE_SOURCE', '../src/package.json');

    grunt.config('version', {
      options: {pkg},
      project: {
        src: [pkg]
      }
    });

    grunt.task.run('version::' + argument('BUILD_TYPE', 'patch'));

  });

};
