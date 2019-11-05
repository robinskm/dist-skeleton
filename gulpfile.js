var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// NOTE: call gulp --option lp/introduction
// where lp/introduction is the directory to find and save files

// the default task
gulp.task('default', ['move_files', 'sass', 'scripts', 'watch'], function () {

});

gulp.task('build', ['move_files', 'sass', 'scripts'], function(){

});

// the watch task
gulp.task('watch', function () {
	gulp.watch('src/**/*.*', ['move_files', 'sass', 'scripts']);
});

// the sass task
gulp.task('sass', function () {
	return gulp.src('src/scss/theme.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minify())
		.pipe(rename({
			basename: 'theme',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		// move to folder
		.pipe(gulp.dest('dist/css'))
});

// the js task
gulp.task('scripts', function () {
	return gulp.src('src/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('theme.js'))
		.pipe(uglify())
		.pipe(rename({
			basename: 'theme',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'))
});

// move files
gulp.task('move_files', function () {

  gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));

		gulp.src('src/lang/*')
			.pipe(gulp.dest('dist/lang'));

  gulp.src('src/fonts/*')
      .pipe(gulp.dest('dist/fonts'));

});