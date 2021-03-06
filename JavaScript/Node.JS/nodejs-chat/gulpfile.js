// =============================================================================
// Required plugins ============================================================
// =============================================================================
var gulp = require('gulp'),                  // Gulp JS
    stylus = require('gulp-stylus'),         // Stylus to CSS
    sass = require('gulp-sass'),             // Sass to CSS
    livereload = require('gulp-livereload'), // Livereload fot Gulp
    myth = require('gulp-myth'),             // Math in CSS - http://www.myth.io
    minifycss = require('gulp-minify-css'),  // Minification CSS
    imagemin = require('gulp-imagemin'),     // Minification images
    cache = require('gulp-cache'),           // Cache image
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),         // Minification JS
    concat = require('gulp-concat'),         // concat files
    notify = require('gulp-notify'),         // Logging
    del = require('del');                    // Delete files/folders using globs

// =============================================================================
// Configuration ===============================================================
// =============================================================================
path = {
  app: "./app/assets/",
  css: "./app/assets/stylesheets",
  js:  "./app/assets/javascript",
  img: "./app/assets/images"
};

watch = {
  css:    path.css + '/*.css',
  stylus: path.css + '/*.styl',
  sass:   path.css + '/*.sass',
  js:     path.js  + '/*.js',
  img:    path.img + '/**/*',
  all:    path.app + '/**/*.*'
};

public = {
  img: "./public/images/",
  css: "./public/stylesheets/",
  js:  "./public/javascript/",
};

// =============================================================================
// Tasks =======================================================================
// =============================================================================
// Build Stylus
gulp.task('stylus', function() {
  return gulp.src(watch.stylus)
    .pipe(stylus())
    .on('error', console.log)
    .pipe(myth())
    .pipe(concat('build-stylus.css'))
    .pipe(gulp.dest(path.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Build Sass
gulp.task('sass', function() {
  return gulp.src(watch.sass)
    .pipe(sass({ compass: true, style: 'expanded', sourcemap: true }))
    .on('error', console.log)
    .pipe(myth())
    .pipe(concat('build-sass.css'))
    .pipe(gulp.dest(path.css))
    .pipe(notify({ message: 'Sass task complete' }));
});

// Build CSS
gulp.task('css', ['sass', 'stylus'], function() {
  return gulp.src([
      path.css + "/materialize.min.css",
      path.css + "/build-sass.css",
      path.css + "/build-stylus.css",
      watch.css
    ])
    .on('error', console.log)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(myth())
    .pipe(concat('index.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(public.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Build JS
gulp.task('js', function() {
  return gulp.src(watch.js)
    .pipe(concat('index.js'))
    .on('error', console.log)
    .pipe(uglify())
    .pipe(gulp.dest(public.js))
    .pipe(notify({ message: 'JS task complete' }));
});

// Minification Image
gulp.task('images', function() {
  return gulp.src(watch.img)
    .pipe(imagemin())
    .on('error', console.log)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(public.img))
    .pipe(notify({ message: 'Image task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
  del([public.css + '*', public.js + '*', public.img + '*', 'app/assets/stylesheets/build*'], cb);
});

// =============================================================================
// Watch =======================================================================
// =============================================================================
gulp.task('watch', function() {
  // Pre-assembly project
  gulp.watch(watch.stylus, ['css']);
  gulp.watch(watch.img, ['images']);
  gulp.watch(watch.js, ['js']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(watch.all).on('change', livereload.changed);
});

// =============================================================================
// Default =====================================================================
// =============================================================================
gulp.task('default', ['clean'], function() {
  gulp.start('css', 'js', 'images');
});

// =============================================================================
// Build =======================================================================
// =============================================================================
gulp.task('build', ['clean'], function() {
  gulp.start('css', 'js', 'images');
});
