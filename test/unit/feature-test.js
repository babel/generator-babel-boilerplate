import MyLibrary from '../../src/index';

describe('A feature test', () => {
  beforeEach(() => {
    spy(MyLibrary, 'mainFn');
    MyLibrary.mainFn();
  });

  it('should have been run once', () => {
    expect(MyLibrary.mainFn).to.have.been.calledOnce;
  });

  it('should have always returned hello', () => {
    expect(MyLibrary.mainFn).to.have.always.returned('hello');
  });
});
