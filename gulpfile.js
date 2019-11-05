//var gulp = require('gulp');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// NOTE: call gulp --option lp/introduction
// where lp/introduction is the directory to find and save files

// sass - move & minify
function scss() {
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
}

// js - move & concat
function js() {
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
}

// move files
function move_files() {

	var files = [
		'src/index.html',
		'src/favicon.ico',
		'src/img/*',
		'src/fonts/*',
	]
	
	return gulp.src(files, {
		base: 'src'
	}).pipe(gulp.dest('dist'));
};

// watch
function watch() {
	gulp.watch('src/**/*.*', gulp.series(gulp.parallel(scss, js, move_files)));
}

// the default task
// gulp.task('default', gulp.series(gulp.parallel(scss, js, move_files, watch)), function () {

// });

// gulp.task('build', gulp.series(gulp.parallel(scss, js, move_files)), function () {

// });

function build() {
	gulp.series(scss, js, move_files)
}

exports.build = build;
exports.default = gulp.series(scss, js, move_files, watch);
