// Imports
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var open = require('open');
	var runSequence = require('run-sequence');

// Tasks

	// Install typings definitions (ex. gulp typings:install --module dt~request --global)
		gulp.task('typings:install', function(module, global) {
			if (!module) {
				shell.exec('node_modules/.bin/typings install');
			} else {
				shell.exec(
					'node_modules/.bin/typings install '+module+' --save'+
					(global ? ' --global' : '')
				);
			}
		});

	// Search for typings definitions
		gulp.task('typings:search', function(module) {
			if (!module) return;
			shell.exec('node_modules/.bin/typings search '+module);
		});

	// Uninstall definition
		gulp.task('typings:uninstall', function(module) {
			if (!module) return;
			shell.exec(
				'node_modules/.bin/typings uninstall '+module+' --save'+
				(global ? ' --global' : '')
			);
		});

	// Start servers
		gulp.task('start:proxy', function () {
			require('./dist/proxy.bundle.js');
		});
		gulp.task('start:app', function () {
			require('./dist/app.bundle.js');
		});
		gulp.task('start:auth', function () {
			require('./dist/auth.bundle.js');
		});

	// Serve app
		gulp.task('serve', function () {
			shell.exec('node_modules/.bin/webpack');
			runSequence(['start:proxy', 'start:app', 'start:auth']);
		});

	// Build webpack
		gulp.task('webpack:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});