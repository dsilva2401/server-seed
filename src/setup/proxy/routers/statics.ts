
// Imports
	import * as express from 'express';
	import {config} from '../../config.ts';

// Define router
	export let router = express.Router();

	// Setup routes
	router.all('*', function (req, res, next) {
		/**
			1. Process api request
			2. Request api
			3. Response request
		*/
		res.redirect(config.servers.statics.url+req.originalUrl);
	});