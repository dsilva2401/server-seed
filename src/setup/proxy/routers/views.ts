
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
		/*var apps = config.webapps.apps;
		Object.keys(apps).forEach(function (appName) {
			var appData = apps[appName];
			console.log(appName, appData);
		});
		res.end('Calling Views');*/
		//next();
		res.end('Calling Views');
	});

	// Setting views
	/*var views = config.httpRoutes.views.services;  
	Object.keys(views).forEach(function (viewName) {
		var routeData = views[viewName];
		var webappData = config.webapps.apps[viewName];
		if (!routeData || !webappData) return;
		
		// Handler
		router.get(routeData.path, function (req, res, next) {
			res.end();
		});
	});*/