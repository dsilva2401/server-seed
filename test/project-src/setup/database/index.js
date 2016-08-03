"use strict";
// Imports
var shell = require('shelljs');
var config_ts_1 = require('../../config.ts');
// Setup
var databaseConfig = config_ts_1.config.servers.database;
function start() {
    setTimeout(function () {
        console.log('Serving database at ' + databaseConfig.domain + ':' + databaseConfig.port);
        // shell.exec('sudo mongod --dbpath='+databaseConfig.dataPath+' --port '+databaseConfig.port);
        shell.exec('sudo mongod');
    }, 10);
}
exports.start = start;
// Start
start();
