'use strict';

var path = require('path');
var sh = require('shelljs');
var inquirer = require('inquirer');
var questions = require('./modules/questions');
var exec = require('child_process').exec;

var binPath = require('path').dirname(require.main.filename);
var rootPath = path.join(binPath, '../templates');

// ----------------------------------------------------------------------------
//  Private Methods
// ----------------------------------------------------------------------------

function _createMsg(msg) {
  sh.echo('   create '.done + msg);
}

function _createFolder(name) {
  _createMsg('/' + name);
  sh.mkdir(name);
}

function _createFile(dir, filename) {
  var folderName = dir.match(/\w+$/g)[0];

  if (dir !== rootPath) {
    _createMsg('/' + folderName + '/' + filename);
    sh.cd(folderName);
    sh.cp(path.join(dir, filename), filename);
    sh.cd('..');
  }
  else {
    _createMsg(filename);
    sh.cat(dir + '/' + filename).to(filename);
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
    _createFile(path.join(rootPath, 'images'), 'assign.png');

    _createFolder('css');
    _createFile(path.join(rootPath, 'css'), 'style.css');

    _createFile(rootPath, 'index.html');
    _createFile(rootPath, 'gulpfile.js');
    _createFile(rootPath, 'participants.csv');

    _createMsg('config.json');
    JSON.stringify(data, null, 2).to('config.json');
  },

  runDependencies: function() {
    var errorMsg;

    if (!sh.which('npm') && !sh.which('node')) {
      errorMsg = 'Oops, NodeJS isn\'t installed. Please install it!';
      console.log(errorMsg.italic.error);
    }

    if (!sh.which('git')) {
      errorMsg = 'Oops, Git isn\'t installed. Please install it!';
      console.log(errorMsg.italic.error);
    }

    if (sh.which('npm') && sh.which('node') && sh.which('git')) {
      sh.exec('npm install gulp gulp-connect gulp-swig',
        function (err, output) {
          if (err) {
            console.log(err);
          }
      });
    }
  },

  runServer: function() {
    if (!sh.which('gulp')) {
      var errorMsg = 'Oops, Gulp isn\'t installed. Please install it:';

      console.log(errorMsg.italic.error);
      console.log('npm install -g gulp'.notice);
    }
    else {
      sh.exec('gulp server');
    }
  }
};
