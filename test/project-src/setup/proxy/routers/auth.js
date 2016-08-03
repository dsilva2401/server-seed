"use strict";
// Imports
var express = require('express');
var request = require('request');
var config_ts_1 = require('../../../config.ts');
// Define router
exports.router = express.Router();
// Setup routes
exports.router.all('*', function (req, res, next) {
    /**
        1. Process api request
        2. Request api
        3. Response requested service
    */
    request({
        url: config_ts_1.config.servers.auth.url + req.originalUrl,
        method: req.method,
        json: true,
        body: req.body
    }, function (error, response, body) {
        if (error) {
            res.status(503).send(error);
            return;
        }
        res.status(response.statusCode).send(body);
    });
});
