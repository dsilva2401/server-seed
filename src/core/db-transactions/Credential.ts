
import {MongoModel} from '../classes/MongoModel.ts';
import {Person as PersonModel} from '../db-models/Person.ts';
import {IPerson} from '../interfaces/IPerson.ts';
import {Credential as CredentialModel} from '../db-models/Credential.ts';
import {getPersonDataFromEmail} from './Person.ts';
import * as Q from 'q';

/**
 * Create Indexes for Credential model
 */
    export function createCredentialsIndexes () {
        var model = new MongoModel('credential');
        model.createIndex({email: 1}, {unique: true});
    }

/**
 * Update or Create Credential
 */
    export function updateOrCreateCredential (email: string, password: string): Promise<any> {
        var model = new MongoModel('credential');
        var deferred = Q.defer();
        var credentialData: CredentialModel = {
            email: email,
            password: password
        };
        model.updateOrCreate({email: email}, credentialData).then(function () {
            deferred.resolve();
        }).catch(deferred.reject);
        return deferred.promise; 
    }

/**
 * Get Owner Data from credentials
 */
    export function getOwnerDataFromCredentials (email: string, password?: string): Promise<IPerson> {
        var model = new MongoModel('credential');
        var deferred = Q.defer();
        var credentialData: CredentialModel = {
            email: email,
            password: password
        }
        model.findOne(credentialData).then(function (respCredentialData?: CredentialModel) {
            if (!respCredentialData) deferred.resolve();
            else getPersonDataFromEmail(respCredentialData.email).then(function (personData: PersonModel) {
                deferred.resolve(personData);
            }).catch(deferred.reject);
        }).catch(deferred.reject);
        return deferred.promise;
    }