'use strict';

var fs = require('fs');
var sh = require('shelljs');
var cp = require('child_process');
var phantomjs = require('phantomjs');

// ----------------------------------------------------------------------------
//  Privated Methods
// ----------------------------------------------------------------------------

function _checkIfExistsCertificates() {
  var dir = exports.getDirs();

  if (!sh.test('-e', dir.certificates)) {
    sh.mkdir(dir.certificates);
  } else {
    sh.rm('-rf', dir.certificates);
    sh.mkdir(dir.certificates);
  }
}

function _executePhantomScript(args, cbSuccess, cbError) {
  var binPath = phantomjs.path;

  cp.execFile(binPath, args, function(err, stdout, stderr) {
    if (err) {
      cbError(err);
    }
    else {
      cbSuccess();
    }
  });
}

function _removeHTMLFile(path) {
  sh.rm('-f', path);
}

// ----------------------------------------------------------------------------
//  Public Methods
// ----------------------------------------------------------------------------

var generator = module.exports = {
  getParticipants: function() {
    var file = fs.readFileSync('participants.csv', 'utf-8');
    var names = file.match(/.+(?=,)/gm);
    var emails = file.match(/([^,\s]+)$/gm);

    var participants = [];
    names.forEach(function(name) {
      participants.push({ name: name });
    });

    emails.forEach(function(email, index) {
      participants[index].email = email;
    });

    return participants;
  },

  getConfig: function() {
    return JSON.parse(fs.readFileSync('config.json', 'utf-8'));
  }
};
