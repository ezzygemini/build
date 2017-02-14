const argument = require('argument');
module.exports = grunt => {

  grunt.registerTask('compassCompile', () => {

    // Load dependencies.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    let basePath;
    let project = 0;

    grunt.file.expand('target/**/scss/').forEach(scssDir => {

      project++;
      basePath = scssDir.replace(/scss\/$/, '');
      grunt.log.writeln(`Running compass on: ${basePath}`);
      grunt.config(`compass.project${project}`, {
        options: {
          sassDir: 'scss',
          basePath: basePath,
          cssDir: 'css',
          imagesDir: 'images',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          environment: 'production',
          outputStyle: 'expanded',
          relativeAssets: true,
          noLineComments: true,
          assetCacheBuster: false,
          trace: true,
          force: true,
          quiet: false
        }
      });

      grunt.config(`cssmin.project${project}`, {
        files: [{
          expand: true,
          cwd: basePath + 'css',
          src: [
            '*.css',
            '!*.min.css',
            '**/*.css',
            '!**/*.min.css'
          ],
          dest: basePath + 'css',
          ext: '.min.css',
          sourceMap: true
        }]
      });

      grunt.registerTask(`deps${project}`, () => {
        grunt.file.expand('target/**/*Config.json').forEach(configFile => {

          const config = grunt.file.readJSON(configFile);
          let cssFiles = [];

          if (config.dependencies) {
            cssFiles = cssFiles
              .concat(config.dependencies.filter(file => /\.css$/.test(file)));
          }

          for (let scope of ['development', 'production', 'beta', 'alpha', 'gamma']) {
            if (config[scope] && config[scope].dependencies) {
              cssFiles = cssFiles.concat(config[scope].dependencies
                .filter(file => /\.css$/.test(file)));
            }
          }

          const projectSource = argument('PROJECT_SOURCE', '../');
          const exists = grunt.file.exists;

          cssFiles.filter(file =>
          !/\.min\./.test(file) && !exists(projectSource + '/' + file.replace(/\.css/, '.min.css'))
          && exists(projectSource + '/' + file))
            .forEach(file => {
              grunt.log.writeln(`Copied ${file} as .min.css`);
              grunt.file.copy(projectSource + '/' + file,
                projectSource + '/' + file.replace(/\.css$/, '.min.css'));
            });

        });
      });

      grunt.task.run([
        `compass:project${project}`,
        `cssmin:project${project}`,
        `deps${project}`
      ]);

    });

  });

};
