
// Imports
	import * as express from 'express';
	import * as request from 'request';
	import {config} from '../../config.ts';

// Define router
	export let router = express.Router();

	// Setup routes
	router.all('*', function (req, res, next) {
		/**
			1. Process api request
			2. Request api
			3. Response requested service
		*/
		request({
			method: req.method,
			url: config.servers.auth.url+req.originalUrl
		}, function (error, response, body) {
			if (error) {
				res.status(503).send(error);
				return;
			}
			res.status(200).send(body);
		});
	});