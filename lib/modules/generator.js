'use strict';

var fs = require('fs');
var path = require('path');
var slug = require('slug');
var swig = require('swig');
var sh = require('shelljs');
var cp = require('child_process');
var phantomjs = require('phantomjs');
var colors = require('../helpers/colors')();

// ----------------------------------------------------------------------------
//  Privated Methods
// ----------------------------------------------------------------------------

function _checkIfExistsCertificates() {
  var certificatesDir = './certificates';

  if (!sh.test('-e', certificatesDir)) {
    sh.mkdir(certificatesDir);
  } else {
    sh.rm('-rf', certificatesDir);
    sh.mkdir(certificatesDir);
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
  CERTIFICATES_DIR: './certificates',

  getParticipants: function() {
    var file = fs.readFileSync('./participants.csv', 'utf-8');
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
    return JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
  },

  createSlug: function(name) {
    return slug(name).toLowerCase();
  },

  generateHTML: function(slug, data) {
    var filePath = path.join(this.CERTIFICATES_DIR, slug + '.html');
    var tpl = fs.readFileSync('./index.html', 'utf-8');
    var file = swig.render(tpl, data);

    file = file.replace(/href\=\"css/g, 'href="../css');
    file = file.replace(/src\=\"images/g, 'src="../images');
    fs.writeFileSync(filePath, file);
  },

  generatePNG: function(slug, name) {
    if (!sh.which('phantomjs')) {
      var errorMsg = 'Oops, PhantomJS isn\'t installed. Please install it!';
      console.log(errorMsg.italic.error);

      return;
    }

    var script = path.join(__dirname, '../helpers/phantom.js');
    var file = path.join(this.CERTIFICATES_DIR, slug + '.html');
    var newFile = path.join(this.CERTIFICATES_DIR, slug + '.png');
    var args = [script, file, newFile];

    _executePhantomScript(args, function() {
      var success = 'Certificate generated successfully to ' + name;
      console.log(success.done);

      _removeHTMLFile(file);
    }, function(err) {
      console.log(err.error);
    });
  },

  generateCertificates: function(participants, cbSuccess) {
    _checkIfExistsCertificates();
    console.log('Waiting, generating certificates...'.notice);

    setTimeout(function() {
      if (participants.length === 0) {
        var errorMsg = 'Please, fill the list of participants';
        console.log(errorMsg.error);
      }
      else {
        participants.forEach(function(data) {
          cbSuccess(data);
        });
      }
    }, 1500);
  }
};
