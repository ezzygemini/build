global.logger = require('logger').logger;
const exec = require('child_process').exec;
const path = require('path');
const argument = require('argument');

logger.level = 'debug';

module.exports = type => {

  const buildSrc = path.relative(__dirname,
      path.normalize(process.cwd() + '/' + argument('source', '')))
      .replace(/\\/g, '/') + '/';
  const projectSrc = path.relative(__dirname, process.cwd())
      .replace(/\\/g, '/') + '/';
  const cmd = 'node ./node_modules/grunt-cli/bin/grunt ' +
    `--BUILD_TYPE=${type} ` +
    `--PACKAGE_SOURCE="${projectSrc}package.json" ` +
    `--PROJECT_SOURCE="${projectSrc}" ` +
    `--BUILD_SOURCE="${buildSrc}"`;

  logger.debug(cmd);

  exec(cmd, {
    cwd: __dirname
  }, (e, stdout, stderr) => {
    if (e) {
      logger.error(e);
    }
    if (stdout) {
      logger.log(stdout);
    }
    if (stderr) {
      logger.error(stderr);
    }
  });

};

