describe('A feature test', function() {
  beforeEach(function() {
    this.method = stub().returns('hello');
    this.method();
  });

  it('should have been run once', function() {
    expect(this.method).to.have.been.calledOnce;
  });

  it('should have always returned hello', function() {
    expect(this.method).to.have.always.returned('hello');
  });
});
