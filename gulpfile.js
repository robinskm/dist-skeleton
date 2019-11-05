var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

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

// move other folders & its contents - will have to manually add more folders from /src
// these folders will not get copied if they are empty
function move_files() {

	var files = [
		'src/*.html',
		'src/favicon.ico',
		'src/img/*',
		'src/fonts/*',
	]
	
	return gulp.src(files, { base: 'src'})
		.pipe(gulp.dest('dist'));
};

// watch - update on save
function watch() {
	gulp.watch('src/**/*.*', gulp.series(gulp.parallel(scss, js, move_files)));
}

function build() {
	gulp.series(scss, js, move_files);
}

exports.build = build;
exports.default = gulp.series(scss, js, move_files, watch);
