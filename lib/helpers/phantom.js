'use strict';

var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1200 };
page.open(system.args[1], function (status) {
  page.render(system.args[2], {format: 'png', quality: '80'});
  phantom.exit();
});
