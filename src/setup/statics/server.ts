
// Imports
	import * as express from 'express';
	import * as path from 'path';
	import {config} from '../../config.ts';

// Server setup
	let serverConfig = config.servers.statics;
	export let server = express();

// Setup statics
	let webappsPath = path.join(process.cwd(), config.httpRoutes.statics.webapps.dir);
	server.use(config.httpRoutes.statics.path+config.httpRoutes.statics.webapps.path, express.static(webappsPath));

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving statics at '+serverConfig.domain+':'+serverConfig.port);
		});
	}