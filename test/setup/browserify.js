var setup = require('./setup');

global.MyLibrary = require('../../tmp/index');
global.mocha.setup('bdd');
global.onload = function() {
  global.mocha.checkLeaks();
  global.mocha.globals(['stub', 'spy', 'expect']);
  global.mocha.run();
  setup();
};
