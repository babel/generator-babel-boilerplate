import Another from './another';

const MyLibrary = {
  anotherFn() {
    return Another.anotherFn() + ', friend';
  },
  mainFn() {
    return 'hello';
  }
};

export default MyLibrary;
