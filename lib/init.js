'use strict';

var app = require('./lib/app');
var path = require('path');
var csv = require('csv');

// app.createCourseData(function (data) {
//   var participants = app.getParticipants();

//   app.generateCertificates(participants, function(participant) {
//     var slug = app.createSlug(participant.name);
//     var localData = {
//       locals: {
//         name: participant.name,
//         course: data
//       }
//     };

//     app.generateHTML(slug, localData);
//     app.generatePNG(slug, participant.name);
//   });
// });
