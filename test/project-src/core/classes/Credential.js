"use strict";
// Imports
var MongoModel_ts_1 = require('./MongoModel.ts');
var PersonBE_ts_1 = require('./PersonBE.ts');
var Q = require('q');
// Exports
var Credential = (function () {
    // Constructor
    function Credential(email, password) {
        var self = this;
        this.email = email;
        if (password)
            this.password = password;
        this.personModel = new MongoModel_ts_1.MongoModel('person');
        this.credentialModel = new MongoModel_ts_1.MongoModel('credential');
        this.credentialModel.createIndex({ email: 1 }, { unique: true });
        if (!password)
            this.load();
    }
    Credential.prototype.load = function () {
        var self = this;
        this.credentialModel.findOne({ email: this.email })
            .then(function (credentialData) {
            if (credentialData) {
                self.password = credentialData.password;
            }
        });
    };
    Credential.prototype.updatePassword = function (password) {
        this.password = password;
        return this.save();
    };
    Credential.prototype.save = function () {
        var deferred = Q.defer();
        var self = this;
        this.credentialModel.updateOrCreate({ email: this.email }, {
            email: this.email,
            password: this.password
        })
            .then(function (personData) {
            deferred.resolve();
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    Credential.prototype.getOwner = function () {
        var deferred = Q.defer();
        this.personModel.findOne({ email: this.email })
            .then(function (owner) {
            owner = (owner ? (new PersonBE_ts_1.PersonBE(owner)) : null);
            deferred.resolve(owner);
        })
            .catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return Credential;
}());
exports.Credential = Credential;
;
