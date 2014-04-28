'use strict';

var app = module.exports = {
  bootstrap: require('./modules/bootstrap'),
  generator: require('./modules/generator'),
  server: require('./modules/server'),
  mail: require('./modules/mail')
};
