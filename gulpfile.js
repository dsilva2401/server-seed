// Imports
	var gulp = require('gulp-param')(require('gulp'), process.argv);
	var shell = require('shelljs');
	var path = require('path');
	var open = require('open');
	var runSequence = require('run-sequence');
	var typedoc = require('gulp-typedoc');
	var ts = require('gulp-typescript');
	var package = require('./package.json');
	var tsconfig = require('./tsconfig.json');
	var fs = require('fs-extra');
	var webpack = require('gulp-webpack');
	var httpRoutes = require('./src/settings/http-routes.json');
	var webapps = httpRoutes.statics.webapps;

// Tasks

	// Generate typescript documentation
		gulp.task('docs:build', function () {
			return gulp
        	.src(['src/**/*.ts', 'typings/**/*.ts'])
        	.pipe(typedoc({
				module: (tsconfig.module || 'commonjs'),
				target: (tsconfig.target || 'es5'),
				out: './wiki',
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
			runSequence([
				'webapps:build',
				'server:build',
				'start:database',
				'start:proxy',
				'start:api',
				'start:auth',
				'start:statics'
			]);
		});

	// Build webpack
		gulp.task('tests:build', function () {
			// Copy settings
			fs.ensureDirSync('test/project-src');
			fs.copy('src/settings', 'test/project-src/settings');
			var tsProject = ts.createProject('tsconfig.json');
			return tsProject.src('src/config.ts')
				.pipe(ts(tsProject)).js
				.pipe(gulp.dest('test/project-src'));
		});
		gulp.task('server:build', function () {
			return shell.exec('node_modules/.bin/webpack');
		});

	// Build webapps
		var webappsEntries = fs.readdirSync(path.join(__dirname, webapps.dir));
		webappsEntries = webappsEntries.filter(function (entry) {
			if (entry == '.DS_Store') return;
			return entry;
		})
		webappsEntries.forEach(function (entryName) {
			var entryPath = path.join(__dirname, webapps.dir, entryName);
			gulp.task('webapp['+entryName+']:build', function () {
				var webpackData = require( path.join(entryPath, 'webpack.config.js') );
				var webappMainEntry = path.join(entryPath, webpackData.entry);
				var webappOutputPath = path.join(webapps.dir, entryName);
				if (webpackData.output.dir) webappOutputPath = path.join(webappOutputPath, webpackData.output.dir);
				return gulp.src(webappMainEntry)
					.pipe( webpack(webpackData) )
					.pipe(gulp.dest(webappOutputPath));
			});
		});
		gulp.task('webapps:build', function () {
			runSequence(webappsEntries.map(function (entryName) {
				return 'webapp['+entryName+']:build';
			}));
		});


	// Build all
		gulp.task('build', function () {
			runSequence([
				'tests:build',
				'docs:build',
				'server:build',
				'webapps:build'
			]);
		});

	// Tests
		gulp.task('test', ['tests:build'], function () {
			shell.exec('node_modules/.bin/mocha --reporter spec test/**/*.spec.js');
		});

		gulp.task('docs:show', function () {
			open( path.join(__dirname, 'wiki/index.html') );
		});