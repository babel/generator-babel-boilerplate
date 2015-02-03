var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  replaceString: /^gulp(-|\.)([0-9]+)?/
});
const fs = require('fs');
const del = require('del');
const path = require('path');
const isparta = require('isparta');
const esperanto = require('esperanto');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

// Adjust this file to configure the build
const config = require('./config');

// Remove the built files
gulp.task('clean', function(cb) {
  del([config.destinationFolder], cb);
});

// Remove our temporary files
gulp.task('clean:tmp', function(cb) {
  del(['tmp'], cb);
});

// Send a notification when JSHint fails,
// so that you know your changes didn't build
function ding(file) {
  return file.jshint.success ? false : 'JSHint failed';
};

// Lint our source code
gulp.task('lint:src', function() {
  return gulp.src(['src/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(ding))
    .pipe($.jshint.reporter('fail'));
});

// Lint our test code
gulp.task('lint:test', function() {
  return gulp.src(['test/unit/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(ding))
    .pipe($.jshint.reporter('fail'));
});

// Build two versions of the library
gulp.task('build', ['lint:src', 'clean'], function(done) {
  esperanto.bundle({
    base: 'src',
    entry: config.entryFileName,
  }).then(function(bundle) {
    res = bundle.toUmd({
      sourceMap: true,
      sourceMapSource: config.entryFileName + '.js',
      sourceMapFile: config.exportFileName + '.js',
      name: config.exportVarName
    });

    // Write the generated sourcemap
    fs.mkdirSync(config.destinationFolder);
    fs.writeFileSync(path.join(config.destinationFolder, config.exportFileName + '.js'), res.map.toString());

    $.file(config.exportFileName + '.js', res.code, { src: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.to5({ blacklist: ['useStrict'] }))
      .pipe($.sourcemaps.write('./', {addComment: false}))
      .pipe(gulp.dest(config.destinationFolder))
      .pipe($.filter(['*', '!**/*.js.map']))
      .pipe($.rename(config.exportFileName + '.min.js'))
      .pipe($.uglifyjs({
        outSourceMap: true,
        inSourceMap: config.destinationFolder + '/' + config.exportFileName + '.js.map',
      }))
      .pipe(gulp.dest(config.destinationFolder))
      .on('end', done);
  });
});

// Use 6to5 to build the library to CommonJS modules. This
// is fed to Browserify, which builds the version of the lib
// for our browser spec runner.
gulp.task('compile_browser_script', function() {
  return gulp.src(['src/**/*.js'])
    .pipe($.plumber())
    .pipe($.to5({modules: 'common'}))
    .pipe(gulp.dest('tmp'))
    .pipe($.filter([config.entryFileName + '.js']))
    .pipe($.rename('__entry.js'))
    .pipe(gulp.dest('tmp'));
});

// Bundle our app for our unit tests
gulp.task('browserify', ['compile_browser_script'], function() {
  var bundleStream = browserify(['./test/setup/browserify.js']).bundle();
  return bundleStream
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe($.plumber())
    .pipe(source('./tmp/__spec-build.js'))
    .pipe(gulp.dest(''))
    .pipe($.livereload());
});

gulp.task('coverage', function(done) {
  gulp.src(['src/*.js'])
    .pipe($.plumber())
    .pipe($.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      return test()
      .pipe($.istanbul.writeReports())
      .on('end', done);
    });
});

function test() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.plumber())
    .pipe($.mocha({reporter: 'dot', globals: config.mochaGlobals}));
};

// Lint and run our tests
gulp.task('test', ['lint:src', 'lint:test'], function() {
  require('6to5/register')({ modules: 'common' });
  return test();
});

// Ensure that linting occurs before browserify runs. This prevents
// the build from breaking due to poorly formatted code.
gulp.task('build_in_sequence', function(callback) {
  runSequence(['lint:src', 'lint:test'], 'browserify', callback);
});

// Set up a livereload environment for our spec runner
gulp.task('test:browser', ['build_in_sequence'], function() {
  $.livereload.listen({port: 35729, host: 'localhost', start: true});
  return gulp.watch(['src/**/*.js', 'test/**/*', '.jshintrc', 'test/.jshintrc', 'config/index.json'], ['build_in_sequence']);
});

// An alias of test
gulp.task('default', ['test']);
