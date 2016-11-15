var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('views', function buildHTML() {
	return gulp.src(['src/**/*.pug', '!src/views/layout.pug'], {base: './src/views/pages'})
		.pipe(pug())
		.pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
	return gulp.src('src/styles/index.styl')
	.pipe(stylus({
		compress: true
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', function(callback) {
	runSequence('clean', 'fonts', 'styles', 'views', 'serve', callback);

	gulp.watch("src/**/*.pug", ['views', browserSync.reload]);
	gulp.watch("src/styles/**/*.styl", ['styles', browserSync.reload]);
});

gulp.task('build', function(callback) {
	runSequence('clean', 'fonts', callback);
});
