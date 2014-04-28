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
    certify.runServer();
  },

  generate: function(opts) {
    var participants = certify.getParticipants();
    console.log(participants);
    // var data = certify.getData();

    // certify.generateCertificates(participants, function(participant) {
    //   var slug = certify.createSlug(participant.name);
    //   var localData = {
    //     locals: {
    //       name: participant.name,
    //       course: data
    //     }
    //   };

    //   certify.generateHTML(slug, localData);
    //   certify.generatePNG(slug, participant.name);
    // });
  },

  send: function(opts) {
    // send certificates via email using nodemailer
  }
};
