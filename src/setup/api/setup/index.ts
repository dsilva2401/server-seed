
// Imports
	import * as express from 'express';

// Export router setup function
	export function setupAPI (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.all('*', function (req, res, next) {
			res.end('Calling API from app server :D :|');
		});

		// Add router to server
		server.use('/api', router);

	}