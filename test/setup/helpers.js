function setupTestHelpers() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    global.stub = this.sinon.stub.bind(this.sinon);
    global.spy = this.sinon.spy.bind(this.sinon);
  });

  afterEach(function() {
    this.sinon.restore();
    delete global.stub;
    delete global.spy;
  });
}

var helpers = {};

var node = typeof exports !== 'undefined';

if (node) {
  require('./node');
  setupTestHelpers();
}

// Configure for the browser
else {
  this.global = window;
  mocha.setup('bdd');

  window.expect = chai.expect;
  window.sinon = sinon;

  onload = function() {
    mocha.checkLeaks();
    mocha.globals(['stub', 'spy']);
    mocha.run();
    setupTestHelpers();
  };
}
