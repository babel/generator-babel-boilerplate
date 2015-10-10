module.exports = function(root) {
  root = root ? root : this;
  root.expect = root.chai.expect;

  beforeEach(function() {
    this.sandbox = root.sinon.sandbox.create();
    root.stub = this.sandbox.stub.bind(this.sandbox);
    root.spy = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete root.stub;
    delete root.spy;
    this.sandbox.restore();
  });
};
