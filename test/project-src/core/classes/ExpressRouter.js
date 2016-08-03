"use strict";
var express = require('express');
// Exports
var ExpressRouter = (function () {
    // Methods
    function ExpressRouter(path) {
        this.path = path;
        this.router = express.Router();
    }
    ExpressRouter.prototype.addRoute = function (method, path, handler) {
        method = method.toLowerCase();
        this.router[method](path, handler);
    };
    return ExpressRouter;
}());
exports.ExpressRouter = ExpressRouter;
