
// Imports
	import * as express from 'express';
	import * as path from 'path';
	import {config} from '../../config.ts';

// Server setup
	let serverConfig = config.servers.webapps;
	export let server = express();

// Setup statics
	let webappsPath = path.join(process.cwd(), 'src/setup/webapps/src');
	server.use(config.httpRoutes.webapps.path, express.static(webappsPath));

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving webapps at '+serverConfig.domain+':'+serverConfig.port);
		});
	}