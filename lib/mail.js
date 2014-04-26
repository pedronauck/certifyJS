'use strict';

var nodemailer = require('nodemailer');
var smtpOptions = require('../config/email.js');
var transport = nodemailer.createTransport('SMTP', smtpOptions);

exports.send = function(html, callback) {
  var mailOptions = {
    from: 'Pedro Nauck ✔ <bemeanfloripa@oncast.com>',
    to: 'pedronauck@gmail.com',
    subject: 'Certificado CursoBeMEAN',
    html: html
  };

  transport.sendMail(mailOptions, callback);
};
