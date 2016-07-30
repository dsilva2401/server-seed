
export let config: any;

config = {};

/**
	=== Servers configuration ===
*/
	config.servers = {};

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