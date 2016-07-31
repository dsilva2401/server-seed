
// Imports
	import * as shell from 'shelljs';
	import {config} from '../config.ts';

// Setup
	let databaseConfig = config.servers.database;
	export function start () {
		setTimeout(function () {
			console.log('Serving database at '+databaseConfig.domain+':'+databaseConfig.port);
			shell.exec('sudo mongod --dbpath '+databaseConfig.dataPath+' --port '+databaseConfig.port);
		}, 10);
	}

// Start
	start();