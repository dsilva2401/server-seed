// Imports
	var config = require('../config.js');
	var data = require('../data.js');
	var serverConfig = config.serverConfig.config;

// Setup
	exports.HTTPService = require('./HTTPService')(data, serverConfig);