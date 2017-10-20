var gulp = require('gulp');

gulp.task('build', ['stylus', 'js'], function() {
  gulp.start('css');
});
