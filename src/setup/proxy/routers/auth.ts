
// Imports
	import * as express from 'express';

// Export router setup function
	export function setupAuth (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.all('*', function (req, res, next) {
			/**
				1. Process api request
				2. Request api
				3. Response request
			*/
			res.end('Calling Auth');
		})

		// Add router to server
		server.use('/auth', router);

	}