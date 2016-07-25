// Imports
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var open = require('open');

// Tasks

	// Install typings definitions
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

	// Serve app
		gulp.task('serve', function () {
			// open('http://localhost:8080/www');
			shell.exec('node_modules/.bin/webpack-dev-server --progress --colors --watch --inline --open');
		});

	// Build webpack
		gulp.task('webpack:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});