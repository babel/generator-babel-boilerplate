const del = require('del');
const gulp = require('gulp');
const to5 = require('gulp-6to5');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const watchify = require('watchify');
const uglify = require('gulp-uglifyjs');
const browserify = require('browserify');
const template = require('gulp-template');
const source = require('vinyl-source-stream');
const preprocess = require('gulp-preprocess');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

// Adjust this file to configure the build
const mainConfig = require('./config/main-config');

// Remove the built files
gulp.task('clean', function(cb) {
  del([mainConfig.distFolder], cb);
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

function build() {
  return gulp.src('src/wrapper.js')
    .pipe(template(mainConfig))
    .pipe(preprocess())
    .pipe(rename(mainConfig.fileName + '.js'))
    .pipe(sourcemaps.init())
    .pipe(to5({blacklist: ['useStrict'], modules: 'ignore'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(mainConfig.distFolder))
    .pipe(filter(['*', '!**/*.js.map']))
    .pipe(rename(mainConfig.fileName + '.min.js'))
    .pipe(uglify(require('./config/build/uglify-config.js')))
    .pipe(gulp.dest(mainConfig.distFolder));
}

gulp.task('compile_browser_script', function() {
  return gulp.src(['src/index.js', 'test/unit/**/*.js'])
    .pipe(to5({modules: 'common'}))
    .pipe(rename('test_script.js'))
    .pipe(gulp.dest('tmp'));
});

gulp.task('browserify', ['compile_browser_script'], function() {
  var bundleStream = browserify('./tmp/test_script.js').bundle();
  bundleStream
    .pipe(source('./tmp/test_script.js'))
    .pipe(gulp.dest(''))
    .pipe(livereload());
});

// Build two versions of the library
gulp.task('build', ['lint:src', 'clean'], build);

// Lint and run our tests
gulp.task('test', ['lint:src', 'lint:test'], function() {
  require('6to5/register')({ modules: 'common' });
  return gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

gulp.task('watch', function() {
  livereload.listen({port: 35729, host: 'localhost', start: true});
  gulp.watch('src/**/*.js', ['browserify']);
});

// Set up a livereload environment for our spec runner
gulp.task('test:browser', ['lint:src', 'lint:test', 'watch']);

// An alias of test
gulp.task('default', ['test']);
