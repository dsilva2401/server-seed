
// Imports
	import * as path from 'path';

// Config interface
	interface Configuration {
		servers: any;
		httpRoutes: any;
		webapps: any;
	}

// Exports
	export let config: Configuration;
	config = { servers: null, httpRoutes: null, webapps: null };

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

	// Webapps Server
	config.servers.webapps = {};
	config.servers.webapps.domain = 'localhost';
	config.servers.webapps.port = 8081;
	config.servers.webapps.url = 'http://'+config.servers.webapps.domain+':'+config.servers.webapps.port;

	// Statics Server
	config.servers.statics = {};
	config.servers.statics.domain = 'localhost';
	config.servers.statics.port = 8080;
	config.servers.statics.url = 'http://'+config.servers.statics.domain+':'+config.servers.statics.port;

/**
	=== HTTP Routes ===
*/	
	// Import configutation
	config.httpRoutes = require('./settings/http-routes.json');
	// Set url attribute
	Object.keys(config.httpRoutes).forEach(function (routerKey: string) {
		let buffRouter = config.httpRoutes[routerKey];
		Object.keys(config.httpRoutes[routerKey].services).forEach(function (serviceKey: string) {
			let buffService = buffRouter.services[serviceKey];
			config.httpRoutes[routerKey].services[serviceKey].url = buffRouter.path+buffService.path;
		});
	});

/**
	=== Webapp ===
*/
	// Import configutation
	config.webapps = require('./settings/webapps.json');