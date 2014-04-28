'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    swig = require('gulp-swig');

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 3000,
  });
});

gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['css/*.css'], ['css']);
});

gulp.task('server', ['connect', 'watch']);
