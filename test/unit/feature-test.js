describe('A feature test', function() {
  beforeEach(function() {
    spy(MyLibrary, 'test');
    MyLibrary.test();
  });

  it('should have been run once', function() {
    expect(MyLibrary.test).to.have.been.calledOnce;
  });

  it('should have always returned hello', function() {
    expect(MyLibrary.test).to.have.always.returned('hello');
  });
});
