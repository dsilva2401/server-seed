"use strict";
// Imports
var config_ts_1 = require('../../config.ts');
var mongodb_1 = require('mongodb');
var Q = require('q');
// import * as promisedMongo from 'promised-mongo';
// import promisedMongo = require('promised-mongo');
// Setup
// console.log(mongoose);
var db;
setTimeout(function () {
    mongodb_1.MongoClient.connect(config_ts_1.config.servers.database.url, function (err, _db) {
        if (err)
            throw err;
        db = _db;
        console.log('Connected succesfully to mongodb');
    });
}, 1000);
// Exports
var MongoModel = (function () {
    // Methods
    function MongoModel(name) {
        this.name = name;
        this.collection = db.collection(name);
    }
    MongoModel.prototype.createIndex = function (fields, options) {
        this.collection.createIndex(fields, options);
    };
    MongoModel.prototype.insert = function (data) {
        var deferred = Q.defer();
        this.collection.insert(data, function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(resp.ops[0]);
        });
        return deferred.promise;
    };
    MongoModel.prototype.updateOrCreate = function (criteria, data) {
        var deferred = Q.defer();
        this.collection.update(criteria, data, {
            upsert: true
        }, function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            var r = {};
            if (resp.result.upserted &&
                resp.result.upserted[0] &&
                resp.result.upserted[0]._id)
                r._id = resp.result.upserted[0]._id.toString();
            deferred.resolve(r);
        });
        return deferred.promise;
    };
    MongoModel.prototype.findOne = function (criteria) {
        var deferred = Q.defer();
        this.collection.findOne(criteria, function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(resp);
        });
        return deferred.promise;
    };
    MongoModel.prototype.remove = function (criteria) {
        var deferred = Q.defer();
        this.collection.remove(criteria, function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(resp);
        });
        return deferred.promise;
    };
    return MongoModel;
}());
exports.MongoModel = MongoModel;
