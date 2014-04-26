'use strict';

var emailAuth = require('../_emailAuth.json');

module.exports = {
  service: 'Gmail',
  auth: {
      user: emailAuth.user,
      pass: emailAuth.pass
  }
};
