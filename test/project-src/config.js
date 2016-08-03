"use strict";
// Imports
var path = require('path');
exports.config = { servers: null, httpRoutes: null };
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
/**
    === HTTP Routes ===
*/
// Import configutation
exports.config.httpRoutes = require('./settings/http-routes.json');
// Set url attribute
Object.keys(exports.config.httpRoutes).forEach(function (routerKey) {
    var buffRouter = exports.config.httpRoutes[routerKey];
    Object.keys(exports.config.httpRoutes[routerKey].services).forEach(function (serviceKey) {
        var buffService = buffRouter.services[serviceKey];
        exports.config.httpRoutes[routerKey].services[serviceKey].url = buffRouter.path + buffService.path;
    });
});
