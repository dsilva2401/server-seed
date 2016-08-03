"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Imports
var Person_ts_1 = require('./Person.ts');
// Exports
var PersonFE = (function (_super) {
    __extends(PersonFE, _super);
    // Attributes
    // Constructor
    function PersonFE(personData) {
        _super.call(this, personData);
    }
    return PersonFE;
}(Person_ts_1.Person));
exports.PersonFE = PersonFE;
;
