'use strict';

var fs = require('fs');
var path = require('path');
var sh = require('shelljs');
var certify = require('./certify');
var colors = require('colors');

colors.setTheme({
  notice: 'cyan',
  error: 'red',
  done: 'green'
});

var cli = module.exports = {
  init: function(opts) {
    certify.gotQuestions(function(data) {
      certify.installBoilerplate(data);
      certify.runDependencies();
    });
  },

  server: function(opts) {
    // init gulp server task
  },

  generate: function(opts) {
    // generate certificates
  },

  send: function(opts) {
    // send certificates via email using nodemailer
  }
};
