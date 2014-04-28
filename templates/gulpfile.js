'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    swig = require('gulp-swig');

gulp.task('connect', function() {
  connect.server({
    root: './templates',
    livereload: true,
    port: 3000,
  });
});

gulp.task('html', function() {
  gulp.src('./templates/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('./templates/css/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./templates/*.html'], ['html']);
  gulp.watch(['./templates/css/*.css'], ['css']);
});

gulp.task('server', ['connect', 'watch']);
