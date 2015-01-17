// Place your library's code here
//
// If you add additional files, be sure to
// load them in order in ./wrapper.js
//

import Another from './another';

const MyLibrary = {
  anotherFn: Another.anotherFn,
  mainFn() {
    return 'hello';
  }
};

export default MyLibrary;
