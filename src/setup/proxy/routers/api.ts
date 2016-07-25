
// Imports
	import * as express from 'express';

// Export router setup function
	export function setupAPI (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.all('*', function (req, res, next) {
			/**
				1. Process api request
				2. Request api
				3. Response request
			*/
			res.end('Calling API');
		})

		// Add router to server
		server.use('/api', router);

	}