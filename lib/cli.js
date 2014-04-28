'use strict';

var cmd = require('commander');

var app = module.exports = {
  init: function(opts) {
    console.log('init');
    // got initial questions
    // install boilerplate files
    // install dependencies
  },

  server: function(opts) {
    console.log('server');
    // init gulp server task
  },

  generate: function(opts) {
    console.log('generate');
    // generate certificates
  },

  send: function(opts) {
    console.log('send');
    // send certificates via email using nodemailer
  }
};
