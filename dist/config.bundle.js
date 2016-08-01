/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Imports
	var path = __webpack_require__(35);
	exports.config = {};
	/**
	    === Servers configuration ===
	*/
	exports.config.servers = {};
	// Database server
	exports.config.servers.database = {};
	exports.config.servers.database.domain = 'localhost';
	exports.config.servers.database.port = 27017;
	exports.config.servers.database.dataPath = path.join(process.cwd(), 'mongodata');
	exports.config.servers.database.dbname = 'serverseed';
	exports.config.servers.database.url = 'mongodb://' + exports.config.servers.database.domain + ':' + exports.config.servers.database.port + '/' + exports.config.servers.database.dbname;
	// Proxy Server
	exports.config.servers.proxy = {};
	exports.config.servers.proxy.domain = 'localhost';
	exports.config.servers.proxy.port = 8000;
	exports.config.servers.proxy.url = 'http://' + exports.config.servers.proxy.domain + ':' + exports.config.servers.proxy.port;
	// App Server
	exports.config.servers.app = {};
	exports.config.servers.app.domain = 'localhost';
	exports.config.servers.app.port = 3000;
	exports.config.servers.app.url = 'http://' + exports.config.servers.app.domain + ':' + exports.config.servers.app.port;
	// Auth Server
	exports.config.servers.auth = {};
	exports.config.servers.auth.domain = 'localhost';
	exports.config.servers.auth.port = 5000;
	exports.config.servers.auth.url = 'http://' + exports.config.servers.auth.domain + ':' + exports.config.servers.auth.port;
	// Statics Server
	exports.config.servers.statics = {};
	exports.config.servers.statics.domain = 'localhost';
	exports.config.servers.statics.port = 8080;
	exports.config.servers.statics.url = 'http://' + exports.config.servers.statics.domain + ':' + exports.config.servers.statics.port;


/***/ },

/***/ 35:
/***/ function(module, exports) {

	module.exports = require("path");

/***/ }

/******/ });