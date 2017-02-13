module.exports = grunt => {

  grunt.registerTask('updateVersion', () => {

    // Load dependency.
    grunt.loadNpmTasks('grunt-version');

    grunt.config('version.project', {
      src: ['package.json']
    });

    grunt.registerTask('build-version-read', function() {
      pkg = grunt.file.readJSON('package.json');
      version = pkg.version;
    });

    grunt.registerTask('build-version-push', function() {
      grunt.task.run([
        'git-add',
        'git-commit:[Release ' + version + '] Version modified',
        'git-tag:' + version,
        'git-push',
        'git-push-tags'
      ]);
    });

  });

};