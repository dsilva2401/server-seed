"use strict";
var ServiceRouter_ts_1 = require('../../../core/classes/ServiceRouter.ts');
var register_ts_1 = require('./register.ts');
// Export router setup function
function setupAuth(server) {
    // Init router
    var sRouter = new ServiceRouter_ts_1.ServiceRouter('auth');
    /**
        === Routes ===
    */
    // Register
    sRouter.addService('register', register_ts_1.controller);
    // Add router to server
    server.use(sRouter.path, sRouter.router);
}
exports.setupAuth = setupAuth;
