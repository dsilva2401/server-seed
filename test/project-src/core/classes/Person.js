"use strict";
// Exports
var Person = (function () {
    // Constructor
    function Person(personData) {
        if (personData) {
            this.name = personData.name;
            this.lastname = personData.lastname;
            this.email = personData.email;
            this.birthday = personData.birthday;
            this.sex = personData.sex;
        }
    }
    Person.prototype.basicData = function () {
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            sex: this.sex,
            birthday: this.birthday,
            email: this.email
        };
    };
    Person.prototype.validate = function () {
        var required = ['name', 'lastname', 'email', 'birthday', 'sex'];
        var missing = [];
        var malformed = [];
        // Validate required
        for (var i = 0; i < required.length; i++) {
            if (!this[required[i]])
                missing.push(required[i]);
        }
        // Validate format
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!!!emailRegex.test(this.email))
            malformed.push('email');
        // Results
        if (!missing.length && !malformed.length)
            return false;
        else
            return { missing: missing, malformed: malformed };
    };
    return Person;
}());
exports.Person = Person;
;
