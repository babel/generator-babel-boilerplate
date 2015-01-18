# es6-library-boilerplate [![Travis build status](http://img.shields.io/travis/jmeas/es6-library-boilerplate.svg?style=flat)](https://travis-ci.org/jmeas/es6-library-boilerplate)

Author libraries in ES6 for Node and the browser.

### Features

- Author in ES6
- Export as ES5 & UMD
- Mocha-Chai-Sinon testing stack
- Unit tests that work in Node and in the browser

### Gulp

There are three primary Gulp tasks.

- `gulp` - Lint the library and tests, then run the unit tests
- `gulp build` - Lint then build the library
- `gulp test:browser` - Build the library for use with the browser spec runner.
  Changes to the source will cause the runner to automatically refresh.

### Browser Tests

The [browser spec runner](https://github.com/jmeas/es6-library-boilerplate/blob/master/test/runner.html)
can be opened in a browser to run your tests. For it to work, you must first run `gulp test:browser`. This
will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.

### FAQ

#### When should I consider using this boilerplate?

You're authoring a library that exports a single file, and that one file
exports a single variable.

#### When might I not want to use this boilerplate?

You can always use this boilerplate as inspiration, but it works best for smaller libraries.
If you're building a full-scale webapp, you will likely need many more changes to the build system.

### Customizing

This boilerplate is, to a certain extent, easily customizable. To make changes,
find what you're looking to do below and follow the instructions.

#### I want to change the primary source file

The primary source file for the library is `src/index.js`. Only the files that this
file imports will be included in the final build. To change the name of this entry file:

1. Rename the file
2. Update the value of `entryFileName` in `config/index.json`
3. Update the filename in `src/wrapper.js`

[View an example diff here.](https://github.com/jmeas/es6-library-boilerplate/compare/master...change-entry-file)

#### I want to change the exported file name

1. Update the value of `exportFileName` in `config/index.json`

#### I want to change what variable my module exports

`MyLibrary` is the name of the variable exported from this boilerplate. You can change this by following
these steps:

1. Ensure that the variable you're exporting exists in your scripts
2. Update the value of `exportVarName` in `config/index.json`
3. Update the globals array in the `test/.jshintrc` file
4. Check that the unit tests have been updated to reference the new value

#### I want to change the destination directory

1. Update the value of `destinationFolder` in `config/index.json`

#### My library depends on an external module

This is a slightly more complex procedure.

1. Install the module via `npm install --save THE_MODULE`
2. Load the module in the [test setup file](https://github.com/jmeas/es6-library-boilerplate/blob/master/test/setup/setup.js).
  Attach any exported variables to global object if you'll be using them in your tests.
3. Update both `.jshintrc` files to include any new global variable that you have added
4. Add those same global variables to the `mochaGlobals` array in `config/index.json`
5. In the `src/wrapper.js` file, several things need to change: load the module in both the AMD and CommonJS 
  module definitions. Load the root version of the module for the browser module definition. Lastly, be
  sure that the factory method accepts the necessary arguments. An example wrapper that depends on
  Underscore can be seen **[here](https://github.com/jmeas/es6-library-boilerplate/blob/add-underscore/src/wrapper.js#L3-L10)**.
