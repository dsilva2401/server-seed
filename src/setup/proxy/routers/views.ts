
// Imports
	import * as express from 'express';
	import * as fs from 'fs';
	import * as path from 'path';
	import {config} from '../../../config.ts';

// Define router
	export let router = express.Router();

	// Setup routes
	router.all('*', function (req, res, next) {
		/**
			1. Process api request
			2. Request api
			3. Response request
		*/
		next();
	});

	// Setting views
	var views = config.httpRoutes.views.services;
	Object.keys(views).forEach(function (viewName) {
		var webappPath = path.join(config.webapps.dir, viewName);
		var webappManifestPath = path.join(webappPath, 'manifest.json');
		var webappManifest = JSON.parse(fs.readFileSync(webappManifestPath, 'utf-8'));
		var indexFilePath = path.join(webappPath, webappManifest.indexPath);
		var indexFile = fs.readFileSync(indexFilePath, 'utf-8');
		router.get(views[viewName].path, function (req, res, next) {
			res.send(indexFile);
			res.end();
		});
	});