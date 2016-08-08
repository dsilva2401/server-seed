
// Imports
	import * as express from 'express';
	import {setupRouters} from './routers/index.ts';
	import {config} from '../../config.ts';
	import * as bodyParser from 'body-parser';
	import * as cookieParser from 'cookie-parser';

// Server setup
	let serverConfig = config.servers.proxy;
	export let server = express();

// Setup routers
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use(cookieParser());
	setupRouters(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving proxy at '+serverConfig.domain+':'+serverConfig.port);
		});
	}