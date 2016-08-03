
// Imports
	import * as express from 'express';
	import {config} from '../../../config.ts';

// Export router setup function
	export function setupAPI (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.all('*', function (req, res, next) {
			res.end('Calling API from app server :D :|');
		});

		// Add router to server
		server.use(config.httpRoutes.api.path, router);

	}