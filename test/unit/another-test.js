describe('A second file', function() {
  beforeEach(function() {
    spy(MyLibrary, 'tester');
    MyLibrary.tester();
  });

  it('should have been run once', function() {
    expect(MyLibrary.tester).to.have.been.calledOnce;
  });

  it('should have always returned hello', function() {
    expect(MyLibrary.tester).to.have.always.returned('ok');
  });
});
