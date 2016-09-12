
// Imports
	import * as express from 'express';
	import {setupRouters} from './routers/index.ts';
	import {config} from '../../config.ts';
	import * as bodyParser from 'body-parser';
	import * as cookieParser from 'cookie-parser';
	import * as morgan from 'morgan';

// Server setup
	let serverConfig = config.servers.proxy;
	export let server = express();

// Setup routers
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use(cookieParser());
	server.use(morgan('dev'));
	server.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if ('OPTIONS' == req.method) res.status(200).send('OK');
		else next();
	});
	setupRouters(server);

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving proxy at '+serverConfig.domain+':'+serverConfig.port);
		});

	}