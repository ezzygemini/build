const argument = require('argument');
module.exports = grunt => {

  grunt.registerTask('announce', () => {

    const {version} =
      grunt.file.readJSON(argument('PACKAGE_SOURCE', '../src/package.json'));

    grunt.log.writeln('==================================');
    grunt.log.writeln(`Release ${version} was successful.`);
    grunt.log.writeln('==================================');

  });

};
