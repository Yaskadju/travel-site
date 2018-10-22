var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', function () {

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function () {
		browserSync.reload();
	});

	// ** means future hypotetical folder and *.css means any file with this extension created in the future
	watch('./app/assets/styles/**/*.css', function () {
		gulp.start('cssInject');
	})
});

gulp.task('cssInject', ['styles'], function () {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});