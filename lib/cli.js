'use strict';

var fs = require('fs');
var path = require('path');
var sh = require('shelljs');
var colors = require('./helpers/colors')();

var app = require('./app');
var bootstrap = app.bootstrap;
var generator = app.generator;
var server = app.server;
var mailer = app.mailer;

var cli = module.exports = {
  init: function(opts) {
    bootstrap.gotQuestions(function(data) {
      bootstrap.install(data);
      bootstrap.runDependencies();
    });
  },

  server: function(opts) {
    server.run();
  },

  generate: function(opts) {
    var config = generator.getConfig(),
        participants;

    if (opts.production) {
      participants = generator.getParticipants();
    }
    else {
      participants = [{
        name: 'John Doe',
        email: 'john@doe.com.br'
      }];
    }

    generator.generateCertificates(participants, function(participant) {
      var slug = generator.createSlug(participant.name);
      var localData = {
        locals: {
          name: participant.name,
          course: config
        }
      };

      generator.generateHTML(slug, localData);
      generator.generatePNG(slug, participant.name);
    });
  },

  send: function(opts) {
    // send certificates via email using nodemailer
  }
};
