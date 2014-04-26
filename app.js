'use strict';

var fs = require('fs'),
    sh = require('shelljs'),
    slug = require('slug'),
    swig = require('swig'),
    pdf = require('html-pdf'),
    info = require('./_data.json');

if (!sh.test('-e', './build')) {
  sh.mkdir('./build');
} else {
  sh.rm('-rf', './build');
  sh.mkdir('./build');
}

info.participants.forEach(function(participant) {
  var file = sh.cat('./templates/index.html'),
      newFile = swig.render(file, {
        locals: {
          name: participant.name,
          course: info.course
        }
      }),
      slugName = slug(participant.name).toLowerCase();

  newFile = newFile.replace(/href\=\"css/g, 'href="../templates/css');
  newFile = newFile.replace(/src\=\"images/g, 'src="../templates/images');

  fs.writeFile('./build/' + slugName + '.html', newFile, function(err) {
    console.log('Generate html from ' + participant.name);
  });
});
