'use strict';

var validateDate = function(date) {
  var done = this.async();
  var regex = /\d{2}\/\d{2}\/\d{4}/g;

  setTimeout(function() {
    if (!regex.test(date)) {
      done('You need to provide a valid date');
      return;
    }

    done(true);
  }, 1000);
};

var validateIsNumber = function(number) {
  var done = this.async();
  var regex = /^-?[0-9]+$/g;

  setTimeout(function() {
    if (!regex.test(number)) {
      done('You need to provide a number');
      return;
    }

    done(true);
  }, 1000);
};

module.exports = [{
  type: 'input',
  name: 'courseName',
  message: 'What\'s the name of your course?'
}, {
  type: 'input',
  name: 'startDate',
  message: 'Type the date that your course started (ex: 01/10/1991)',
  validate: validateDate
}, {
  type: 'input',
  name: 'endDate',
  message: 'Type the date that your course finished (ex: 01/10/1991)',
  validate: validateDate
}, {
  type: 'input',
  name: 'totalHours',
  message: 'What\'s the duration of your course in hours? (Only numbers)',
  validate: validateIsNumber,
  filter: function(hour) {
    return hour + ' horas';
  }
}, {
  type: 'input',
  name: 'city',
  message: 'In which city your course happened?'
}, {
  type: 'input',
  name: 'state',
  message: 'In which state your course happened? (ex: SP)'
}];
