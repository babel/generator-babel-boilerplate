const del = require('del');
const gulp = require('gulp');
const to5 = require('gulp-6to5');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const uglify = require('gulp-uglifyjs');
const template = require('gulp-template');
const preprocess = require('gulp-preprocess');
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');

// Adjust this file to configure the build
const mainConfig = require('./config/main-config');

// Remove the built files
gulp.task('clean', function(cb) {
  del([mainConfig.distFolder], cb);
});

// Build two versions of the library
gulp.task('build', ['clean'], function() {
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
});

gulp.task('test', function() {
  return gulp.src(['test/setup/node.js', 'test/setup/helpers.js', 'test/unit/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

gulp.task('default', ['test']);
