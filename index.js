global.logger = require('logger').logger;
const exec = require('child_process').exec;
logger.level = 10;

// module.exports = require('./gruntfile')(require('./node_modules/grunt-cli/bin/grunt'));

const cmd =
  `node ./node_modules/grunt-cli/bin/grunt --source="${process.cwd()}"`;
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
