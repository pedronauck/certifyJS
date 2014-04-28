'use strict';

var sh = require('shelljs');

var server = module.exports = {
  run: function() {
    if (!sh.which('gulp')) {
      var errorMsg = 'Oops, Gulp isn\'t installed. Please install it:';

      console.log(errorMsg.italic.error);
      console.log('npm install -g gulp'.notice);
    }
    else {
      sh.exec('gulp server');
    }
  }
};
