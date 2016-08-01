
// Imports
	import * as path from 'path';

// Exports
	export let config: any;
	config = {};

/**
	=== Servers configuration ===
*/
	config.servers = {};

	// Database server
	config.servers.database = {};
	config.servers.database.domain = 'localhost';
	config.servers.database.port = 27017;
	config.servers.database.dataPath = path.join(process.cwd(), 'mongodata');
	config.servers.database.dbname = 'serverseed';
	config.servers.database.url = 'mongodb://'+config.servers.database.domain+':'+config.servers.database.port+'/'+config.servers.database.dbname;

	// Proxy Server
	config.servers.proxy = {};
	config.servers.proxy.domain = 'localhost';
	config.servers.proxy.port = 8000;
	config.servers.proxy.url = 'http://'+config.servers.proxy.domain+':'+config.servers.proxy.port;
	
	// App Server
	config.servers.app = {};
	config.servers.app.domain = 'localhost';
	config.servers.app.port = 3000;
	config.servers.app.url = 'http://'+config.servers.app.domain+':'+config.servers.app.port;

	// Auth Server
	config.servers.auth = {};
	config.servers.auth.domain = 'localhost';
	config.servers.auth.port = 5000;
	config.servers.auth.url = 'http://'+config.servers.auth.domain+':'+config.servers.auth.port;

	// Statics Server
	config.servers.statics = {};
	config.servers.statics.domain = 'localhost';
	config.servers.statics.port = 8080;
	config.servers.statics.url = 'http://'+config.servers.statics.domain+':'+config.servers.statics.port;