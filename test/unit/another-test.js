describe('A second file of tests', function() {
  beforeEach(function() {
    spy(MyLibrary, 'anotherFn');
    MyLibrary.anotherFn();
  });

  it('should have been run once', function() {
    expect(MyLibrary.anotherFn).to.have.been.calledOnce;
  });

  it('should have always returned hello', function() {
    expect(MyLibrary.anotherFn).to.have.always.returned('ok');
  });
});
