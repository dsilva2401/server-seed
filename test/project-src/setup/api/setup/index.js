"use strict";
// Imports
var express = require('express');
var config_ts_1 = require('../../../config.ts');
// Export router setup function
function setupAPI(server) {
    // Init router
    var router = express.Router();
    // Setup routes
    router.all('*', function (req, res, next) {
        res.end('Calling API from app server :D :|');
    });
    // Add router to server
    server.use(config_ts_1.config.httpRoutes.api.path, router);
}
exports.setupAPI = setupAPI;
