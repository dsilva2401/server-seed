"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Imports
var config_ts_1 = require('../../config.ts');
var ExpressRouter_ts_1 = require('./ExpressRouter.ts');
// Exports
var ServiceRouter = (function (_super) {
    __extends(ServiceRouter, _super);
    // Methods
    function ServiceRouter(name) {
        var routerConfig = config_ts_1.config.httpRoutes[name];
        _super.call(this, routerConfig.path);
        this.name = name;
    }
    ServiceRouter.prototype.addService = function (name, handler) {
        var serviceConfig = config_ts_1.config.httpRoutes[this.name].services[name];
        this.addRoute(serviceConfig.method, serviceConfig.path, handler);
    };
    return ServiceRouter;
}(ExpressRouter_ts_1.ExpressRouter));
exports.ServiceRouter = ServiceRouter;
