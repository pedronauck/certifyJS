'use strict';

var fs = require('fs'),
    sh = require('shelljs'),
    slug = require('slug'),
    swig = require('swig'),
    pdf = require('html-pdf'),
    names = require('./data/names.json');

if (!sh.test('-e', './build')) {
  sh.mkdir('./build');
} else {
  sh.rm('-rf', './build');
  sh.mkdir('./build');
}

names.forEach(function(data) {
  data.styleDir = '../templates/css';
  data.imagesDir = '../templates/images';

  var file = sh.cat('./templates/index.html'),
      newFile = swig.render(file, { locals: data }),
      slugName = slug(data.name).toLowerCase();

  fs.writeFile('./build/' + slugName + '.html', newFile, function(err) {
    console.log('Generate html from ' + data.name);
  });

  // var sizes = {
  //   width: '297mm',
  //   height: '210 mm'
  // };

  // pdf.create(newFile, sizes, function(err, buffer) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   fs.writeFile('./build/' + slugName + '.pdf', buffer);
  // });
});
