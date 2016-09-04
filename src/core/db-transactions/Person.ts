
import {MongoModel} from '../classes/MongoModel.ts';
import {PersonBE} from '../classes/PersonBE.ts';
import {IPerson} from '../interfaces/IPerson.ts';
import {Person as PersonModel} from '../db-models/Person.ts';
import {updateOrCreateCredential} from './Credential.ts';
import * as Q from 'q';

let model = new MongoModel('person');

// Register Person
export function registerPerson (personData: PersonModel, password: string): Promise<IPerson> {
    let deferred = Q.defer();
    model.insert(personData).then(function (respData: PersonModel) {
        updateOrCreateCredential(personData.email, password).then(function () {
            deferred.resolve(respData);
        }).catch(deferred.reject);
    }).catch(deferred.reject);
    return deferred.promise;
}

// Get person data
export function getPersonData (id: string): Promise<IPerson> {
    let deferred = Q.defer();
    model.findOne({ _id: id }).then(function (personData?: PersonModel) {
        deferred.resolve(personData);
    }).catch(deferred.reject);
    return deferred.promise;
}