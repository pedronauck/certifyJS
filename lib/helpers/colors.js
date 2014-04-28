'use strict';

var colors = require('colors');

module.exports = function() {
  colors.setTheme({
    notice: 'cyan',
    error: 'red',
    done: 'green'
  });
};
