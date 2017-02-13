module.exports = grunt => {

  grunt.task.loadTasks('gruntTasks');

  grunt.log.writeln('Starting build process.');

  grunt.registerTask('default', () => {
    grunt.task.run([
      'copyFiles'
    ]);
  });

};

