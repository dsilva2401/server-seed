
// Imports
	import * as express from 'express';
	import {setupAPI} from './api/index.ts';
	import {config} from '../config.ts';

// Server setup
	let serverConfig = config.servers.app;
	export let server = express();

// Setup routers
	setupAPI(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving app at '+serverConfig.domain+':'+serverConfig.port);
		});
	}