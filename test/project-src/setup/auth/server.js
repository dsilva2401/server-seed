"use strict";
// Imports
var express = require('express');
var index_ts_1 = require('./setup/index.ts');
var config_ts_1 = require('../../config.ts');
var bodyParser = require('body-parser');
// Server setup
var serverConfig = config_ts_1.config.servers.auth;
exports.server = express();
// Setup routers
exports.server.use(bodyParser.urlencoded({ extended: false }));
exports.server.use(bodyParser.json());
index_ts_1.setupAuth(exports.server);
// Start function
function startServer() {
    exports.server.listen(serverConfig.port, function () {
        console.log('Serving auth at ' + serverConfig.domain + ':' + serverConfig.port);
    });
}
exports.startServer = startServer;
