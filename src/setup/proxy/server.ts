
// Imports
	import * as express from 'express';
	import {setupRouters} from './routers/index.ts';
	import {config} from '../config.ts';

// Server setup
	let serverConfig = config.servers.proxy;
	export let server = express();

// Setup routers
	setupRouters(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving proxy at '+serverConfig.domain+':'+serverConfig.port);
		});
	}