var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');
var run = require('gulp-run');

gulp.task('default', function () {
  gulp.src(['lib/angular.js', 'lib/angular-ui-router.js', 'src/app.js', 'src/ctrl/*.js', 'src/filters/*.js'])
    .pipe(concat('build.js'))
    .pipe(angularFilesort())
    .pipe(gulp.dest('./'));
  run('node server/server.js').exec()
});

gulp.watch('src/*', ['default']);
gulp.watch('pages/*', ['default']);

var validate = require('gulp-html-angular-validate');
 
gulp.task('html-lint', function () {
  var options = {
    customattrs: ['*'],
    customtags: ['*'],
  };
  gulp.src('htmlGlob')
    .pipe(validate(options));
});