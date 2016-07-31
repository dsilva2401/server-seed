
// Imports
	import * as express from 'express';
	import * as path from 'path';
	import {config} from '../config.ts';

// Server setup
	let serverConfig = config.servers.statics;
	export let server = express();

// Setup statics
	let staticsPath = path.join(process.cwd(), 'src/setup/statics/files');
	server.use('/statics', express.static(staticsPath));

// Start function
	export function startServer () {
		server.listen(serverConfig.port, function () {
			console.log('Serving statics at '+serverConfig.domain+':'+serverConfig.port);
		});
	}