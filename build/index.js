var argv = require('yargs').argv;

require('babel-core/register')({
  stage: 0
});

var tasks = {
  copy: require('./copy'),
  clean: require('./clean')
};

var task = argv.task;
tasks[task]();


