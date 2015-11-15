var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

// define tasks here
gulp.task('default', function() {
    // run tasks here
    // set up watch handlers here
    
});

gulp.src('./index.html')
  .pipe(inject(
    gulp.src(['./src/**/*.js']).pipe(angularFilesort())
  ))
  .pipe(gulp.dest('./build'));


gulp.task('concat', function() {
    gulp.src('part*')
        .pipe(concat('result.txt'))
        .pipe(gulp.dest('./'));
});