
import {MongoModel} from '../classes/MongoModel.ts';
import {Session} from '../classes/Session.ts';
import {Session as SessionModel} from '../db-models/Session.ts';
import * as Q from 'q';

/**
 * Create Session
 */
    export function createSession (personId:string, key: string): Promise<Session> {
        var model = new MongoModel('session');
        var deferred = Q.defer();
        var sessionData: SessionModel = {
            personId: personId,
            key: key
        } 
        model.insert(sessionData).then(function (respData: SessionModel) {
            deferred.resolve(sessionData);
        }).catch(deferred.reject);
        return deferred.promise;
    }