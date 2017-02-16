const argument = require('argument');
const AWS = require('aws-sdk');

module.exports = grunt => {

  grunt.registerTask('upload', function() {

    const packageFile = argument('PACKAGE_SOURCE', '../../package.json');
    const packageConfig = grunt.file.readJSON(packageFile);
    const {version} = packageConfig;
    const awsConfig = packageConfig.aws || {};
    const region = argument(['region', 'REGION'], awsConfig.region);
    const accessKeyId = argument(['accessKeyId', 'ACCESS_KEY_ID'],
      awsConfig.accessKeyId);
    const secretAccessKey = argument(['secretAccessKey', 'SECRET_ACCESS_KEY'],
      awsConfig.secretAccessKey);
    const elasticBeanstalkApp = argument('ELASTIC_BEANSTALK_APPLICATION',
      (awsConfig.elasticBeanstalk || {}).application);
    const bucket = argument('ELASTIC_BEANSTALK_BUCKET',
      (awsConfig.elasticBeanstalk || {}).bucket);
    const prefix = argument('ELASTIC_BEANSTALK_PREFIX',
      (awsConfig.elasticBeanstalk || {}).prefix || 'release');
    const s3 = new AWS.S3({
      accessKeyId, secretAccessKey, region,
      apiVersion: '2006-03-01'
    });
    const eb = new AWS.ElasticBeanstalk({
      accessKeyId, secretAccessKey, region,
      apiVersion: '2010-12-01'
    });

    if (!accessKeyId || !secretAccessKey) {
      return;
    }

    grunt.log.writeln('Using credentials:');
    grunt.log.writeln(accessKeyId);
    grunt.log.writeln(secretAccessKey);

    const done = this.async();

    s3.putObject({
      Bucket: bucket,
      Key: `${prefix}-${version}.zip`,
      ACL: 'public-read',
      Body: grunt.file.read(`package.zip`, {encoding: null})
    })
      .promise()
      .then(() => s3.copyObject({
        Bucket: bucket,
        CopySource: `${bucket}/${prefix}-${version}.zip`,
        Key: `${prefix}.zip`
      })
        .promise()
        .then(() => !elasticBeanstalkApp ?
          true : eb.createApplicationVersion({
            ApplicationName: elasticBeanstalkApp,
            VersionLabel: `${prefix}-${version}`,
            AutoCreateApplication: true,
            Description: `version ${version}`,
            Process: true,
            SourceBundle: {
              S3Bucket: bucket,
              S3Key: `${prefix}-${version}.zip`
            }
          }).promise()))
      .then(done, e => grunt.fail.fatal(e));

  });


};
