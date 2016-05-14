### [7.3.0](https://github.com/babel/babel-library-boilerplate/releases/tag/7.3.0)

- Fixes an error in the `.eslintrc` file under generated for the test suite
- Removes JSCS, as it has been deprecated
- Fixes issue where failed tests might not cause a CI build to fail
- Smarter algorithms are used to produce the resulting `package.json` based
  on the module name that you provide

### [7.2.1](https://github.com/babel/babel-library-boilerplate/releases/tag/7.2.1)

- Fixes a bug where invalid an invalid `package.json` could be generated if double
  quotes were included in responses

### [7.2.0](https://github.com/babel/babel-library-boilerplate/releases/tag/7.2.0)

- JSCS now logs output when it fails
- LiveReload snippet in unit test browser file will now work across your local network,
  making it easier for you to test on other devices

### [7.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/7.1.0)

- Travis tests run on Node 4 and the stable release of Node
- Updates location of Babel polyfill for the browser spec runner

### [7.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/7.0.0)

- The boilerplate now uses Babel v6
- While I was at it, I updated every other dependency, too

### [6.0.2](https://github.com/babel/babel-library-boilerplate/releases/tag/6.0.2)

- Fix issue where detected username would end in a newline

### [6.0.1](https://github.com/babel/babel-library-boilerplate/releases/tag/6.0.1)

- Fix installation error

### [6.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/6.0.0)

- The `gulpfile` is now authored in ES2015
- The `gulpfile` is now linted
- The `gulpfile` has been cleaned up
- The boilerplate should now support more Babel transforms. Because support for these things is always changing, I encourage you to try out the features you wish to use to see if they work. [File an issue](https://github.com/babel/generator-babel-boilerplate/issues/new) if they don't!
- There's a new `npm` script solely for linting: `npm lint`
- Webpack is now the sole build tool. It has replaced Esperanto (which is deprecated) and Browserify
- Linting errors will no longer send an OS notification; instead, it will beep your terminal

Much thanks goes to @thejameskyle, @marcandre , @paulfalgout, and @kflash for help with this release!

### [5.1.1](https://github.com/babel/babel-library-boilerplate/releases/tag/5.1.1)

- Resolves a bug where files were being excluded from published npm packages

### [5.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v5.1.0)

- Fixes a bug where CodeClimate coverage would not be sent
- Adds an `editorconfig` file

### [5.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v5.0.0)

- The boilerplate has been converted into a Yeoman generator, which makes using it far, far easier.
- A `.babelrc` file has been added, which simplifies the existing the Babel config, and makes it easier for you to change your Babel preferences.
- Watchify is now used for the browser tests. This should speed up the reload time for large web apps or libraries.
- ESLint has been updated to v1.0.0.

### [4.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v4.0.0)

- Watch keeps an eye on more files
- Travis now tests against more things! More specifically, io.js and Node 0.12
- Updated dependencies, which led to changes in the config files (such as the .eslintrc file for the tests)
- As part of the above change, JSCS now supports every Babel feature
- JSHint has been swapped with ESLint + Babel-ESLint, which also provides support for every Babel feature

### [3.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v3.1.0)

- Lints test set-up files in addition to the tests themselves
- Travis builds now lint the library
- Fixes a bug where Travis would not report failures when unit tests were failing

### [3.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v3.0.0)

- Fixes a bug where coverage reports would not be generated
- Adopts the name `babel`

### [2.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v2.1.0)

- You no longer need to specify the individual test files in the browser runner; Browserify bundles it all together
- You can author your unit tests in ES6 now, as well!
- Add CHANGELOG file
- No longer specify the output directory or file. It's determined by the `main` field in `package.json`
- Add JSSC to lint for code style
- Remove code style rules from JSHint
- Add `gulp watch` to run headless tests as you make changes to the library and tests

### [2.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v2.0.0)

This library is now officially endorsed by 6to5! That's pretty cool, right?

- **Enhancement:** No more config file! Simply specify the configuration directly in `package.json`.
- **Enhancement:** Gulp tasks aliased as `npm` scripts.
- **Enhancement:** A consistent separator is used for all Gulp tasks now: a hyphen.
- **Documentation:** Adds browser compatibility to the FAQ
- **Documentation:** Adds link to Yeoman generator version of this boilerplate

### [1.1.2](https://github.com/babel/babel-library-boilerplate/releases/tag/v1.1.2)

- **Bugfix:** Removes unnecessary loose mode option when bundling the scripts for the browser with 6to5
- **Refactor:** Removed unnecessary references to the wrapper file from the gulpfile.

### [1.1.1](https://github.com/babel/babel-library-boilerplate/releases/tag/v1.1.1)

- **Enhancement:** Removes unused devDependencies from `package.json`.

### [1.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v1.1.0)

**Enhancement:** No more wrapper file, thanks to [esperanto](https://github.com/esperantojs/esperanto).

### [1.0.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v1.0.0)

- **Feature:** Add [david-dm](https://david-dm.org/) badges to the README
- **Feature:** Add [Code Climate](https://codeclimate.com)
- **Docs:** Document basic usage
- **Refactor:** Update to [6to5 v3](http://6to5.org/blog/2015/01/27/2to3/)
- **Refactor:** Utilize [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
- **Refactor:** Replace gulp-istanbul fork with main project
- **Bug fix:** Fix issue where browserify errors would break the stream
- **Bug fix:** Fix issue where watch would load too soon when running browser tests

### [0.1.0](https://github.com/babel/babel-library-boilerplate/releases/tag/v0.1.0)

Nothing of note.

### [0.0.5](https://github.com/babel/babel-library-boilerplate/releases/tag/v0.0.5)

- **Bugfix**: The 6to5 polyfill is now included in the browser test runner
