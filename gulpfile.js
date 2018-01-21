/*  Gulp will be used for development and deployment tasks, 
such as minification of code, translating SCSS into SASS & CSS,
and reloading after a save.See the README.md for gulp commands.
*/
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('serve', function () {
    // Serve files from the root of the project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
      .pipe(sass())     
      .pipe(gulp.dest('css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

// Minifies js.
gulp.task('minify-js', function() {
    return gulp.src('js/main.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('js'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  //Runs all appropriate tasks and watches for changes. 
gulp.task('dev', ['serve', 'sass', 'minify-js'], function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('*.html');
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('*.html', reload);
    gulp.watch('js/**/*.js', reload);
  });