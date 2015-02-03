import Another from './another';

const MyLibrary = {
  anotherFn: Another.anotherFn,
  mainFn() {
    return 'hello';
  }
};

export default MyLibrary;
