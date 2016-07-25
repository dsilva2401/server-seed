
// Imports
	import * as express from 'express';
	import {setupRouters} from './routers/index.ts';

// Server setup
	export let server = express();

// Setup routers
	setupRouters(server);

// Start function
	export function startServer () {
		server.listen(8000, function () {
			console.log('Serving proxy at port 8000');
		});
	}