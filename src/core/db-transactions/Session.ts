
import {MongoModel} from '../classes/MongoModel.ts';
import {Session} from '../classes/Session.ts';
import {Session as SessionModel} from '../db-models/Session.ts';

let model = new MongoModel('session');

export function createSession (personId:string, keySize: number): Promise<Session> {
    let deferred = Q.defer();
    let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys1234567890';
    let key = '';
    for (let n=0; n<keySize; n++) {
        key += abc[Math.floor(Math.random()*abc.length)];
    }
    let sessionData: SessionModel = {
        personId: personId,
        key: key
    } 
    model.insert(sessionData).then(function (respData: SessionModel) {
        deferred.resolve(sessionData);
    }).catch(deferred.reject);
    return deferred.promise;
}