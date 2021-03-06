
import {MongoModel} from '../classes/MongoModel.ts';
import {PersonBE} from '../classes/PersonBE.ts';
import {IPerson} from '../interfaces/IPerson.ts';
import {IPersonWithCredentials} from '../interfaces/IPersonWithCredentials.ts';
import {Error} from '../interfaces/Error.ts';
import {Person as PersonModel} from '../db-models/Person.ts';
import {updateOrCreateCredential} from './Credential.ts';
import * as Q from 'q';
import {validate} from '../services/validate.ts';
import {returnServerError} from '../services/returnServerError.ts';


/**
 * Create Indexes for Person model
 */
    export function createPersonIndexes () {
        var model = new MongoModel('person');
        model.createIndex({email: 1}, {unique: true});
    }

/**
 * Register a new Person
 */
    export function registerPerson (personData: IPersonWithCredentials): Promise<IPerson> {
        var model = new MongoModel('person');
        var deferred = Q.defer();
        // Validate
        var validationResults = validate(personData, require('../schemas/PersonWithCredentials.json'));
        if (validationResults.errors.length) {
            var error: Error = {
                httpStatus: 400,
                description: 'Invalid parameters',
                error: validationResults.errors
            };
            deferred.reject(error);
            return deferred.promise;
        }
        getPersonDataFromEmail(personData.email).then(function (registeredPerson?: PersonModel) {
            // Verify if already registered
            if (registeredPerson) {
                var error: Error = {
                    httpStatus: 409,
                    description: 'Already registered'
                };
                deferred.reject(error);
                return;
            }
            // Register
            model.insert(personData).then(function (respData: PersonModel) {
                updateOrCreateCredential(personData.email, personData.password).then(function () {
                    deferred.resolve(respData);
                })
                // Error on register credentials
                .catch(function (err) {
                    model.remove({
                        email: personData.email
                    });
                    returnServerError(deferred)(err);
                });
            }).catch(returnServerError(deferred));
        }).catch(returnServerError(deferred));
        return deferred.promise;
    }

/**
 * Update or Create a Person
 */
    export function updateOrCreatePerson (personData: PersonModel): Promise<any> {
        var model = new MongoModel('person');
        var deferred = Q.defer();
        model.updateOrCreate({email: personData.email}, personData).then(function () {
            deferred.resolve();
        }).catch(deferred.reject);
        return deferred.promise; 
    }

/**
 * Get Person Data
 */
    export function getPersonDataFromId (id: string): Promise<IPerson> {
        var model = new MongoModel('person');
        var deferred = Q.defer();
        model.findOne({ _id: id }).then(function (personData?: PersonModel) {
            deferred.resolve(personData);
        }).catch(deferred.reject);
        return deferred.promise;
    }
    export function getPersonDataFromEmail (email: string): Promise<IPerson> {
        var model = new MongoModel('person');
        var deferred = Q.defer();
        model.findOne({ email: email }).then(function (personData?: PersonModel) {
            deferred.resolve(personData);
        }).catch(deferred.reject);
        return deferred.promise;
    }