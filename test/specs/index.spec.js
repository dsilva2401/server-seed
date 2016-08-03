// Imports
	var config = require('../config.js');
	var data = require('../data.js');
	var services = require('../services');
	var serverConfig = config.serverConfig.config;

// Setup
	var testData = {
		data: data,
		serverConfig: serverConfig,
		services: services
	}

	// HTTP Services
	require('./http-services')(testData);