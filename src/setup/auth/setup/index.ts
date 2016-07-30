
// Imports
	import * as express from 'express';

// Export router setup function
	export function setupAuth (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.all('*', function (req, res, next) {
			res.end('Calling Auth service..');
		});

		// Add router to server
		server.use('/auth', router);

	}