
// Imports
	import * as express from 'express';
	import {setupAuth} from './setup/index.ts';
	import {config} from '../../config.ts';
	import * as bodyParser from 'body-parser';
	import * as cookieParser from 'cookie-parser';

// Server setup
	let serverConfig = config.servers.auth;
	export let server = express();

// Setup routers
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use(cookieParser());
	setupAuth(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving auth at '+serverConfig.domain+':'+serverConfig.port);
		});
	}