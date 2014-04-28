'use strict';

var path = require('path');
var sh = require('shelljs');
var inquirer = require('inquirer');
var questions = require('./modules/questions');
var exec = require('child_process').exec;

var binPath = require('path').dirname(require.main.filename);
var rootPath = path.join(binPath, '../lib/templates');

// ----------------------------------------------------------------------------
//  Private Methods
// ----------------------------------------------------------------------------

function _createMsg(msg) {
  sh.echo('   create '.done + msg);
}

function _createFolder(name) {
  _createMsg('./' + name);
  sh.mkdir(name);
}

function _createFile(path, filename) {
  var folderName = path.match(/\w+$/g)[0];

  if (path !== rootPath) {
    _createMsg('./' + folderName + '/' + filename);
    sh.cd(folderName);
    sh.cat(path + '/' + filename).to(filename);
    sh.cd('..');
  }
  else {
    _createMsg('./' + folderName + '/' + filename);
    sh.cat(path + '/' + filename).to(filename);
  }
}

// ----------------------------------------------------------------------------
//  Public Methods
// ----------------------------------------------------------------------------

var app = module.exports = {
  gotQuestions: function(cb) {
    inquirer.prompt(questions, function(answers) {
      var courseData = {
        'name': answers.courseName,
        'startDate': answers.startDate,
        'endDate': answers.endDate,
        'totalHours': answers.totalHours,
        'city': answers.city,
        'state': answers.state
      };

      cb(courseData);
    });
  },

  installBoilerplate: function(data) {
    _createFolder('images');

    _createFolder('data');
    _createFile(path.join(rootPath, 'data'), 'participants.json');
    _createFile(path.join(rootPath, 'data'), 'participants.csv');

    _createFolder('css');
    _createFile(path.join(rootPath, 'css'), 'style.css');

    _createFile(rootPath, 'gulpfile.js');
    _createFile(rootPath, 'index.html');

    _createMsg('config.json');
    JSON.stringify(data, null, 2).to('config.json');
  },

  runDependencies: function() {
    if (!sh.which('npm') && !sh.which('node')) {
      console.log('Oops, NodeJS isn\'t installed. Please install it!'.error);
    }

    if (!sh.which('git')) {
      console.log('Oops, Git isn\'t installed. Please install it!'.error);
    }

    sh.exec('npm install gulp gulp-connect gulp-swig',
      function (err, output) {
        if (err) {
          console.log(err);
        }
    });
  }
};
