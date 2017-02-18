
var _ = require('lodash');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var paths = {

  scss: ['codefarmert/web_src/scss/**/*.scss'],
  js_entries: ['codefarmert.js'],
  js_entries_dir: 'codefarmert/web_src/js/',
  build_dir: 'web/build/',
  dist_dir: 'codefarmert/static/codefarmert/'
};


gulp.task('css', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.build_dir + '/css/'));
});

_.map(paths.js_entries, function (js_entry){
    gulp.task(js_entry, function () {
      // set up the browserify instance on a task basis
      var b = browserify({
        entries: paths.js_entries_dir + js_entry,
        debug: true
      });

      return b.bundle()
        .pipe(source(js_entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build_dir + '/js/'));
    });

})


gulp.task('javascript', paths.js_entries)

gulp.task('build', ['css', 'javascript']);

gulp.task('makedist', function(){
  return gulp.src(paths.build_dir + '**/*')
    .pipe(gulp.dest(paths.dist_dir));
})
