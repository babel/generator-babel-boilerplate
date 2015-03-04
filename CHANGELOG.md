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
