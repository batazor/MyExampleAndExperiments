var concat = require('gulp-concat');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var config = require('../config').js;

gulp.task('js', function() {
  return gulp.src(config.watch)
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});
