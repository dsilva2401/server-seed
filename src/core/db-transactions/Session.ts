
import {MongoModel} from '../classes/MongoModel.ts';
import {Session} from '../classes/Session.ts';
import {Session as SessionModel} from '../db-models/Session.ts';
import * as Q from 'q';

export function createSession (personId:string, keySize: number): Promise<Session> {
    var model = new MongoModel('session');
    var deferred = Q.defer();
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys1234567890';
    var key = '';
    for (var n=0; n<keySize; n++) {
        key += abc[Math.floor(Math.random()*abc.length)];
    }
    var sessionData: SessionModel = {
        personId: personId,
        key: key
    } 
    model.insert(sessionData).then(function (respData: SessionModel) {
        deferred.resolve(sessionData);
    }).catch(deferred.reject);
    return deferred.promise;
}