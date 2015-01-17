function setup() {
  global.expect = global.chai.expect;

  beforeEach(function() {
    this.sandbox = global.sinon.sandbox.create();
    global.stub = this.sandbox.stub.bind(this.sandbox);
    global.spy  = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete global.stub;
    delete global.spy;
    this.sandbox.restore();
  });
}

if (global.navigator) {
  global.MyLibrary = require('../tmp/index');
  global.chai = require('chai');
  global.sinon = require('sinon');
  global.chai.use(require('sinon-chai'));
  global.mocha.setup('bdd');
  global.onload = function() {
    global.mocha.checkLeaks();
    global.mocha.globals(['stub', 'spy', 'expect']);
    global.mocha.run();
    setup();
  };
  setup();
} else {
  global.MyLibrary = require('../src/index');
  global.chai = require('chai');
  global.sinon = require('sinon');
  global.chai.use(require('sinon-chai'));
  setup();
}
