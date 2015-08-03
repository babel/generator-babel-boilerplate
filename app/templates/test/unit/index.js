import <%= variable %> from '../../src/<%= repo %>';

describe('<%= variable %>', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(<%= variable %>, 'greet');
      <%= variable %>.greet();
    });

    it('should have been run once', () => {
      expect(<%= variable %>.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(<%= variable %>.greet).to.have.always.returned('hello');
    });
  });
});
