var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.css.watch, ['css']);
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.js.watch, ['js']);

  gulp.watch(config.browserSync.files, require('browser-sync').reload);
});
