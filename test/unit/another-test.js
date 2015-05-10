import Another from '../../src/another';

describe('A second file of tests', () => {
  beforeEach(() => {
    spy(Another, 'anotherFn');
    Another.anotherFn();
  });

  it('should have been run once', () => {
    expect(Another.anotherFn).to.have.been.calledOnce;
  });

  it('should have always returned ok', () => {
    expect(Another.anotherFn).to.have.always.returned('ok');
  });
});
