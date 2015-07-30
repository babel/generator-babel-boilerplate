import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del from 'del';
import glob from 'glob';
import path from 'path';
import babelify from 'babelify';
import isparta from 'isparta';
import esperanto from 'esperanto';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';

import manifest from './package.json';

const $ = loadPlugins();

const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

// Remove a directory
function clean(dir, cb) {
  del([dir], cb);
}

// Send a notification when JSCS fails,
// so that you know your changes didn't build
function jscsNotify(file) {
  if (!file.jscs) { return; }
  return file.jscs.success ? false : 'JSCS failed';
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.jscs())
    .pipe($.notify(jscsNotify));
}

function build(done) {
  esperanto.bundle({
    base: 'src',
    entry: config.entryFileName,
  }).then(bundle => {
    let res = bundle.toUmd({
      // Don't worry about the fact that the source map is inlined at this step.
      // `gulp-sourcemaps`, which comes next, will externalize them.
      sourceMap: 'inline',
      name: config.exportVarName
    });

    $.file(exportFileName + '.js', res.code, { src: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.babel())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(destinationFolder))
      .pipe($.filter(['*', '!**/*.js.map']))
      .pipe($.rename(exportFileName + '.min.js'))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(destinationFolder))
      .on('end', done);
  })
  .catch(done);
}

function browserifyBundle() {
  let testFiles = glob.sync('./test/unit/**/*');
  let allFiles = ['./test/setup/browserify.js'].concat(testFiles);
  let bundler = browserify(allFiles);
  bundler.transform(babelify.configure({
    sourceMapRelative: __dirname + '/src'
  }));
  return bundler.bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe($.plumber())
    .pipe(source('./tmp/__spec-build.js'))
    .pipe(gulp.dest(''))
    .pipe($.livereload());
}

function mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.mocha({reporter: 'dot', globals: config.mochaGlobals}));
}

function coverage(done) {
  require('babel-core/register');
  gulp.src(['src/**/*.js'])
    .pipe($.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return mocha()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

function test() {
  require('babel-core/register');
  return mocha();
}

function buildInSequence(cb) {
  runSequence(['lint-src', 'lint-test'], 'browserify', cb);
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc'];

function watch() {
  gulp.watch(watchFiles, ['test']);
}

function testBrowser() {
  $.livereload.listen({port: 35729, host: 'localhost', start: true});
  return gulp.watch(watchFiles, ['build-in-sequence']);
}

// Remove the built files
gulp.task('clean', done => clean(destinationFolder, done));

// Remove our temporary files
gulp.task('clean-tmp', done => clean('tmp', done));

// Lint our source code
gulp.task('lint-src', () => lint('src/**/*.js'));

// Lint our test code
gulp.task('lint-test', () => lint('test/**/*.js'));

// Build two versions of the library
gulp.task('build', ['lint-src', 'clean'], build);

// Bundle our app for our unit tests
gulp.task('browserify', browserifyBundle);

// Set up coverage and run tests
gulp.task('coverage', ['lint-src', 'lint-test'], coverage);

// Lint and run our tests
gulp.task('test', ['lint-src', 'lint-test'], test);

// Ensure that linting occurs before browserify runs. This prevents
// the build from breaking due to poorly formatted code.
gulp.task('build-in-sequence', buildInSequence);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// Set up a livereload environment for our spec runner
gulp.task('test-browser', ['build-in-sequence'], testBrowser);

// An alias of test
gulp.task('default', ['test']);
