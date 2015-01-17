const del = require('del');
const gulp = require('gulp');
const to5 = require('gulp-6to5');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const uglify = require('gulp-uglifyjs');
const browserify = require('browserify');
const template = require('gulp-template');
const source = require('vinyl-source-stream');
const preprocess = require('gulp-preprocess');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

// Adjust this file to configure the build
const config = require('./config');

// Remove the built files
gulp.task('clean', function(cb) {
  del([config.distFolder], cb);
});

gulp.task('clean:tmp', function(cb) {
  del(['tmp'], cb);
});

// Lint our source code
gulp.task('lint:src', function() {
  return gulp.src(['src/**/*.js', '!src/wrapper.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Lint our test code
gulp.task('lint:test', function() {
  return gulp.src(['test/unit/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Build two versions of the library
gulp.task('build', ['lint:src', 'clean'], function() {
  return gulp.src('src/wrapper.js')
    .pipe(template(config))
    .pipe(preprocess())
    .pipe(rename(config.fileName + '.js'))
    .pipe(sourcemaps.init())
    .pipe(to5({blacklist: ['useStrict'], modules: 'ignore'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distFolder))
    .pipe(filter(['*', '!**/*.js.map']))
    .pipe(rename(config.fileName + '.min.js'))
    .pipe(uglify({
      outSourceMap: true,
      inSourceMap: config.distFolder + '/' + config.fileName + '.js.map',
    }))
    .pipe(gulp.dest(config.distFolder));
});

// Use 6to5 to build the library to CommonJS modules. This
// is fed to Browserify, which builds the version of the lib
// for our browser spec runner.
gulp.task('compile_browser_script', function() {
  return gulp.src(['src/**/*.js', '!src/wrapper.js'])
    .pipe(to5({modules: 'common'}))
    .pipe(gulp.dest('tmp'));
});

// Browserify does not support dynamic names, so
// we need to create a predictable entry point for it
gulp.task('rename_input', function() {
  return gulp.src(['tmp/' + config.entryFileName + '.js'])
    .pipe(rename('__entry.js'))
    .pipe(gulp.dest('tmp'));
});

// Bundle our app for our unit tests
gulp.task('browserify', ['compile_browser_script', 'rename_input'], function() {
  var bundleStream = browserify(['./test/setup/browserify.js']).bundle();
  bundleStream
    .pipe(source('./tmp/__spec-build.js'))
    .pipe(gulp.dest(''))
    .pipe(livereload());
});

// Lint and run our tests
gulp.task('test', ['lint:src', 'lint:test'], function() {
  require('6to5/register')({ modules: 'common' });
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

// This is used when testing in the browser. Reloads the tests
// when the lib, or the tests themselves, change.
gulp.task('watch', function() {
  livereload.listen({port: 35729, host: 'localhost', start: true});
  gulp.watch(['src/**/*.js', 'test/**/*'], ['browserify']);
});

// Set up a livereload environment for our spec runner
gulp.task('test:browser', ['lint:src', 'lint:test', 'browserify', 'watch']);

// An alias of test
gulp.task('default', ['test']);
