'use strict';

var fs = require('fs');
var path = require('path');
var sh = require('shelljs');
var colors = require('colors');

var app = require('./app');
var bootstrap = app.bootstrap;
var generator = app.generator;
var server = app.server;
var mail = app.mail;

colors.setTheme({
  notice: 'cyan',
  error: 'red',
  done: 'green'
});

var cli = module.exports = {
  init: function(opts) {
    console.log(bootstrap);
    // bootstrap.gotQuestions(function(data) {
    //   bootstrap.install(data);
    //   bootstrap.runDependencies();
    // });
  },

  server: function(opts) {
    console.log(server);
    // server.run();
  },

  generate: function(opts) {
    var participants = generator.getParticipants();
    var config = generator.getConfig();

    // certify.generateCertificates(participants, function(participant) {
    //   // var slug = certify.createSlug(participant.name);
    //   // var localData = {
    //   //   locals: {
    //   //     name: participant.name,
    //   //     course: data
    //   //   }
    //   // };

    //   // certify.generateHTML(slug, localData);
    //   // certify.generatePNG(slug, participant.name);
    // });
  },

  send: function(opts) {
    // send certificates via email using nodemailer
  }
};
