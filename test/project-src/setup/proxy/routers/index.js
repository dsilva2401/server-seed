"use strict";
// Imports
var auth_ts_1 = require('./auth.ts');
var api_ts_1 = require('./api.ts');
var views_ts_1 = require('./views.ts');
var statics_ts_1 = require('./statics.ts');
var config_ts_1 = require('../../../config.ts');
// Export setup routers function
function setupRouters(server) {
    server.use(config_ts_1.config.httpRoutes.api.path, api_ts_1.router);
    server.use(config_ts_1.config.httpRoutes.auth.path, auth_ts_1.router);
    server.use(config_ts_1.config.httpRoutes.statics.path, statics_ts_1.router);
    server.use(config_ts_1.config.httpRoutes.views.path, views_ts_1.router);
}
exports.setupRouters = setupRouters;
