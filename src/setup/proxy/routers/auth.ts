
// Imports
	import * as express from 'express';
	import * as request from 'request';
	import {config} from '../../../config.ts';
	import {httpRequest} from '../../../core/services/httpRequest.ts';
	import {IHTTPResponse} from '../../../core/interfaces/IHTTPResponse.ts';

// Define router
	export let router = express.Router();

// Setup routes
	router.all('*', function (req, res, next) {

		// Setup vars
		let url = config.servers.auth.url+req.originalUrl;

		// Handle request
		httpRequest(req.method, url, {
			data: req.body,
			cookies: req.cookies
		})
		// Success
		.then(function (response: IHTTPResponse) {
			Object.keys(response.cookies).forEach(function (cookieKey) {
				res.cookie(cookieKey, response.cookies[cookieKey]);
			});
			res.status(response.statusCode);
			res.send(response.body);
			res.end();
		})
		// Error
		.catch(function (err) {
			res.status(503);
			res.send(err);
			res.end();
		});
		
	});