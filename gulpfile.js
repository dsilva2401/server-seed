// Imports
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var open = require('open');
	var runSequence = require('run-sequence');
	var typedoc = require('gulp-typedoc');
	var package = require('./package.json');
	var tsconfig = require('./tsconfig.json');

// Tasks

	// Generate typescript documentation
		gulp.task('doc:build', function () {
			return gulp
        	.src(['src/**/*.ts', 'typings/**/*.ts'])
        	.pipe(typedoc({
				module: (tsconfig.module || 'commonjs'),
				target: (tsconfig.target || 'es5'),
				out: './wiki',
				// theme: 'minimal',
				name: package.name,
				media: './media'
			}));
		});

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
		gulp.task('start:api', function () {
			require('./dist/api.bundle.js');
		});
		gulp.task('start:auth', function () {
			require('./dist/auth.bundle.js');
		});
		gulp.task('start:database', function () {
			require('./dist/database.bundle.js');
		});
		gulp.task('start:statics', function () {
			require('./dist/statics.bundle.js');
		});

	// Serve app
		gulp.task('serve', function () {
			shell.exec('node_modules/.bin/webpack');
			runSequence([
				'start:database',
				'start:proxy',
				'start:api',
				'start:auth',
				'start:statics'
			]);
		});

	// Build webpack
		gulp.task('webpack:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});

	// Build all
		gulp.task('build', function () {
			runSequence([
				'doc:build',
				'webpack:build'
			]);
		});

	// Tests
		gulp.task('test', function () {
			shell.exec('node_modules/.bin/mocha --reporter spec test/**/*.spec.js');
		})