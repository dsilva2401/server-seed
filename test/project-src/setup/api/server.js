"use strict";
// Imports
var express = require('express');
var index_ts_1 = require('./setup/index.ts');
var config_ts_1 = require('../../config.ts');
// Server setup
var serverConfig = config_ts_1.config.servers.app;
exports.server = express();
// Setup routers
index_ts_1.setupAPI(exports.server);
// Start function
function startServer() {
    exports.server.listen(serverConfig.port, function () {
        console.log('Serving api at ' + serverConfig.domain + ':' + serverConfig.port);
    });
}
exports.startServer = startServer;
