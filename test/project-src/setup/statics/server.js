"use strict";
// Imports
var express = require('express');
var path = require('path');
var config_ts_1 = require('../../config.ts');
// Server setup
var serverConfig = config_ts_1.config.servers.statics;
exports.server = express();
// Setup statics
var staticsPath = path.join(process.cwd(), 'src/setup/statics/files');
exports.server.use(config_ts_1.config.httpRoutes.statics.path, express.static(staticsPath));
// Start function
function startServer() {
    exports.server.listen(serverConfig.port, function () {
        console.log('Serving statics at ' + serverConfig.domain + ':' + serverConfig.port);
    });
}
exports.startServer = startServer;
