'use strict';

var fs = require('fs'),
    cp = require('child_process'),
    sh = require('shelljs'),
    colors = require('colors'),
    slug = require('slug'),
    swig = require('swig'),
    path = require('path'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path,
    data = require('./_data.json');

colors.setTheme({
  notice: 'cyan',
  error: 'red',
  done: 'green'
});

var dir = {
  certificates: path.join(__dirname, 'certificates'),
  libs: path.join(__dirname, 'lib'),
  templates: path.join(__dirname, 'templates')
};

if (!sh.test('-e', dir.certificates)) {
  sh.mkdir(dir.certificates);
} else {
  sh.rm('-rf', dir.certificates);
  sh.mkdir(dir.certificates);
}

console.log('Waiting, generating certificates...'.notice);
data.participants.forEach(function(participant) {
  var slugName = slug(participant.name).toLowerCase();
  var screenCapture = path.join(dir.libs, 'screenCapture.js');
  var filePath = path.join(dir.certificates, slugName + '.html');
  var tpl = fs.readFileSync(path.join(dir.templates, 'index.html'), 'utf-8');
  var file = swig.render(tpl, {
    locals: {
      name: participant.name,
      course: data.course
    }
  });

  var args = [
    screenCapture,
    filePath,
    path.join(dir.certificates, slugName + '.png'),
  ];

  file = file.replace(/href\=\"css/g, 'href="../templates/css');
  file = file.replace(/src\=\"images/g, 'src="../templates/images');
  fs.writeFileSync(filePath, file);

  cp.execFile(binPath, args, function(err, stdout, stderr) {
    var message = 'Certificate generated successfully to ' + participant.name;
    console.log(message.done);
    sh.rm('-f', filePath);
  });
});
