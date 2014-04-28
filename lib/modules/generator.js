'use strict';

var fs = require('fs'),
    path = require('path'),
    cp = require('child_process'),
    sh = require('shelljs'),
    colors = require('colors'),
    inquirer = require('inquirer'),
    slug = require('slug'),
    swig = require('swig'),
    phantomjs = require('phantomjs'),
    questions = require('./questions');

var TEMPLATES_DIR = '../templates';
var CERTIFICATES_DIR = '../certificates';
var LIBS_DIR = '../lib';

// ----------------------------------------------------------------------------
//  Private Functions
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

function _activeShellColors() {
  colors.setTheme({
    notice: 'cyan',
    error: 'red',
    done: 'green'
  });
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
//  Public Functions
// ----------------------------------------------------------------------------

module.exports = {
  getDirs: function() {
    return {
      templates: path.join(__dirname, TEMPLATES_DIR),
      certificates: path.join(__dirname, CERTIFICATES_DIR),
      libs: path.join(__dirname, LIBS_DIR)
    };
  },

  createSlug: function(name) {
    return slug(name).toLowerCase();
  },

  generateHTML: function(slug, data) {
    var dir = this.getDirs();
    var filePath = path.join(dir.certificates, slug + '.html');
    var tpl = fs.readFileSync(path.join(dir.templates, 'index.html'), 'utf-8');
    var file = swig.render(tpl, data);

    file = file.replace(/href\=\"css/g, 'href="../templates/css');
    file = file.replace(/src\=\"images/g, 'src="../templates/images');
    fs.writeFileSync(filePath, file);
  },

  generatePNG: function(slug, name) {
    var dir = this.getDirs();
    var htmlFile = path.join(dir.certificates, slug + '.html');
    var script = path.join(dir.libs, 'modules/screenCapture.js');
    var newFileName = path.join(dir.certificates, slug + '.png');
    var args = [script, htmlFile, newFileName];

    _executePhantomScript(args, function() {
      var success = 'Certificate generated successfully to ' + name;
      console.log(success.done);

      _removeHTMLFile(htmlFile);
    }, function(err) {
      console.log(err.error);
    });
  },

  createCourseData: function(cb) {
    inquirer.prompt(questions, function(answers) {
      var courseData = {
        name: answers.courseName,
        startDate: answers.startDate,
        endDate: answers.endDate,
        totalHours: answers.totalHours,
        city: answers.city,
        state: answers.state
      };

      cb(courseData);
    });
  },

  generateCertificates: function(participants, cbSuccess, cbError) {
    _checkIfExistsCertificates();
    _activeShellColors();

    console.log('Waiting, generating certificates...'.notice);

    setTimeout(function() {
      if (participants.length === 0) {
        var err = 'Empty list of participants'.error;
        console.log(err);
      }

      participants.forEach(function(data) {
        cbSuccess(data);
      });
    }, 2000);
  }
};
