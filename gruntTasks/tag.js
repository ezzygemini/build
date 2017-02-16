const argument = require('argument');
module.exports = grunt => {

  grunt.registerTask('tag', () => {

    // Load dependency.
    grunt.loadNpmTasks('grunt-git');

    const {version} =
      grunt.file.readJSON(argument('PACKAGE_SOURCE', '../src/package.json'));

    grunt.config('gitadd.project', {
      options: {all: true}
    });

    grunt.config("gitcommit.project", {
      options: {
        message: `Packaging new version ${version}`
      },
      files: {
        src: argument('PROJECT_SOURCE', '../../')
      }
    });

    grunt.config("gittag.project", {
      options: {
        tag: version,
        message: `New tag ${version} version`
      }
    });

    grunt.config("gitpush.project", {
      options: {tags: false}
    });

    grunt.config("gitpush.tags", {
      options: {tags: true}
    });


    grunt.task.run([
      'gitadd',
      'gitcommit',
      'gittag',
      'gitpush'
    ]);

  });

};
