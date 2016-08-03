"use strict";
// Imports
var PersonBE_ts_1 = require('../../../core/classes/PersonBE.ts');
var Credential_ts_1 = require('../../../core/classes/Credential.ts');
// Exports
function controller(req, res, next) {
    var currentPerson = new PersonBE_ts_1.PersonBE(req.body);
    // Data validation
    var errors = currentPerson.validate();
    if (errors || !req.body.password) {
        res.status(400);
        res.json(errors);
        res.end();
        return;
    }
    // Verify if not exists
    var credential = new Credential_ts_1.Credential(currentPerson.email);
    credential.getOwner()
        .then(function (owner) {
        if (owner) {
            res.status(409);
            res.json({
                details: 'Already registered'
            });
            res.end();
            return;
        }
        // Save current person data
        currentPerson.save()
            .then(function () {
            currentPerson.credential.updatePassword(req.body.password)
                .then(function () {
                res.status(200);
                res.json(currentPerson.basicData());
                res.end();
            })
                .catch(function (err) {
                currentPerson.destroy();
                res.status(500);
                res.json(err);
                res.end();
            });
        })
            .catch(function (err) {
            res.status(500);
            res.json(err);
            res.end();
        });
    })
        .catch(function (err) {
        res.status(500);
        res.json(err);
        res.end();
    });
}
exports.controller = controller;
;
