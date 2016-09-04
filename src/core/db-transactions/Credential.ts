
import {MongoModel} from '../classes/MongoModel.ts';
import {IPerson} from '../interfaces/IPerson.ts';
import {Credential as CredentialModel} from '../db-models/Credential.ts';
import {getPersonData} from './Person.ts';


let model = new MongoModel('credental');

export function updateOrCreateCredential (email: string, password: string): Promise<any> {
    let deferred = Q.defer();
    let credentialData: CredentialModel = {
        email: email,
        password: password
    }
    model.updateOrCreate({email: email}, credentialData).then(function () {
        deferred.resolve();
    }).catch(deferred.reject);
    return deferred.promise; 
}

export function getOwnerData (email: string, password: string): Promise<IPerson> {
    let deferred = Q.defer();
    let credentialData: CredentialModel = {
        email: email,
        password: password
    }
    this.model.findOne(credentialData).then(function (respCredentialData?: CredentialModel) {
        if (!respCredentialData) deferred.resolve();
        else return getPersonData(respCredentialData._id);
    }).catch(deferred.reject);
    return deferred.promise;
}