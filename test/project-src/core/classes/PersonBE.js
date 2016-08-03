"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Imports
var Person_ts_1 = require('./Person.ts');
var Credential_ts_1 = require('./Credential.ts');
var MongoModel_ts_1 = require('./MongoModel.ts');
var Q = require('q');
// Exports
var PersonBE = (function (_super) {
    __extends(PersonBE, _super);
    function PersonBE(dataOrId) {
        // Id
        if (typeof dataOrId == 'string') {
            _super.call(this);
            this.id = dataOrId;
            this.load();
        }
        else {
            _super.call(this, dataOrId);
            this.credential = new Credential_ts_1.Credential(this.email);
        }
        this.personModel = new MongoModel_ts_1.MongoModel('person');
        this.personModel.createIndex({ email: 1 }, { unique: true });
    }
    PersonBE.prototype.load = function () {
        var self = this;
        this.personModel.findOne({
            _id: this.id
        }).then(function (data) {
            if (data) {
                self.name = data.name;
                self.lastname = data.lastname;
                self.email = data.email;
                self.sex = data.sex;
                self.birthday = data.birthday;
                self.credential = new Credential_ts_1.Credential(self.email);
            }
        });
    };
    PersonBE.prototype.save = function () {
        var deferred = Q.defer();
        var self = this;
        var data = {
            name: this.name,
            lastname: this.lastname,
            sex: this.sex,
            email: this.email,
            birthday: this.birthday
        };
        this.personModel.updateOrCreate({ email: this.email }, data)
            .then(function (personData) {
            if (personData && personData._id)
                self.id = personData._id;
            deferred.resolve();
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    PersonBE.prototype.destroy = function () {
        return this.personModel.remove({
            email: this.email
        });
    };
    return PersonBE;
}(Person_ts_1.Person));
exports.PersonBE = PersonBE;
;
