"use strict";
// Imports
var express = require('express');
var config_ts_1 = require('../../../config.ts');
// Define router
exports.router = express.Router();
// Setup routes
exports.router.all('*', function (req, res, next) {
    /**
        1. Process api request
        2. Request api
        3. Response request
    */
    res.redirect(config_ts_1.config.servers.statics.url + req.originalUrl);
});
