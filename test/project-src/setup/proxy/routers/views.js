"use strict";
// Imports
var express = require('express');
// Define router
exports.router = express.Router();
// Setup routes
exports.router.all('*', function (req, res, next) {
    /**
        1. Process api request
        2. Request api
        3. Response request
    */
    res.end('Calling Views');
});
