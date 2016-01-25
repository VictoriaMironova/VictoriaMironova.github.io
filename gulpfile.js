var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function(){
  gulp.watch('app/scss/style.scss', ['sass']); 
  
})
var fileinclude = require('gulp-file-include');
 
gulp.task('fileinclude', function() {
  gulp.src(['app/tpl/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app/'));
});