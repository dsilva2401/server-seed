
// Imports
	import * as express from 'express';
	import {setupAuth} from './setup/index.ts';
	import {config} from '../config.ts';

// Server setup
	let serverConfig = config.servers.auth;
	export let server = express();

// Setup routers
	setupAuth(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving auth at '+serverConfig.domain+':'+serverConfig.port);
		});
	}