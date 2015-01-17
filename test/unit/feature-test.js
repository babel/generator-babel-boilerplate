describe('A feature test', function() {
  beforeEach(function() {
    spy(MyLibrary, 'mainFn');
    MyLibrary.mainFn();
  });

  it('should have been run once', function() {
    expect(MyLibrary.mainFn).to.have.been.calledOnce;
  });

  it('should have always returned hello', function() {
    expect(MyLibrary.mainFn).to.have.always.returned('hello');
  });
});
