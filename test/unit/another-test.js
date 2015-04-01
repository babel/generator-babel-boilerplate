import MyLibrary from '../../src/index';

describe('A second file of tests', () => {
  beforeEach(() => {
    spy(MyLibrary, 'anotherFn');
    MyLibrary.anotherFn();
  });

  it('should have been run once', () => {
    expect(MyLibrary.anotherFn).to.have.been.calledOnce;
  });

  it('should have always returned ok', () => {
    expect(MyLibrary.anotherFn).to.have.always.returned('ok');
  });
});
