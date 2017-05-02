var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();

// Paths
var paths = {
  main: 'app/index.html',
  styles: 'app/styles/*.scss',
  scripts: 'app/scripts/*.js'
};

// Server task
gulp.task('serve', ['compile'], function() {
  browserSync.init({
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  // Watchers
  gulp.watch(paths.main).on('change', reload);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('compile', function(cb) {
  runSequence('styles', 'scripts', cb);
});

// Styles task
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe($.plumber())
    .pipe($.sass.sync({
      includePaths: ['.']
    }))
    .on('error', $.sass.logError)
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

// Scripts task
gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe($.plumber())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});


// Default task
gulp.task('default', ['serve']);
