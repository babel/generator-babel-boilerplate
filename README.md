# es6-library-boilerplate

Author libraries in ES6 for Node and the browser.

### Features

- Author in ES6
- Export ES5 / UMD
- Mocha/Chai/Sinon testing stack
- Unit tests that work in Node and the browser

### Gulp

There are three main Gulp tasks for you to use.

- `gulp` - Lint the library and tests, then run the unit tests
- `gulp build` - Lint then build the library
- `gulp test:browser` - Build the library for use with the browser spec runner.
  Changes to the source will cause the runner to automatically refresh.

### Browser Tests

The [browser spec runner](https://github.com/jmeas/es6-library-boilerplate/blob/master/test/runner.html)
can be opened in a browser to run your tests. For it to work, you must first run `gulp test:browser`. This
will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.

### When to use this boilerplate

This boilerplate works best for libraries that export a single file, and that single file
exports a single variable.

### When not to use this boilerplate

This boilerplate is not designed to build an entire web application. It is also not
good if your library needs to export more than one file, or more than one variable.

### FAQ

Configuring this library requires making changes in several places. A guide
to do this will be coming soon!
