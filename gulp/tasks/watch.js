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
		// any save that we make, triggers this cssInject class
		// this will make the dependencies ['styles] begin and complete
		// before running the cssInject task
		// so that way, the compiled style.css file will have a chance to 
		// be generated, and only on that point, we will pipe it in to the browsersync
	})
});

gulp.task('cssInject', ['styles'], function () {
	// ['styles'] tells gulp to begin and complete any dependency task
	// inside [], which is this case is 'styles', that is a dependency of the cssInject task 
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});

// always add "return" in an assync function