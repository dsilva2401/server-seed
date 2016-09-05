
import {MongoModel} from '../classes/MongoModel.ts';
import * as Q from 'q';
import {Webmaster as WebmasterModel} from '../db-models/Webmaster';
import {returnServerError} from '../services/returnServerError.ts';
import {IPerson} from '../interfaces/IPerson';
import {BasePerson} from '../classes/BasePerson';
import {Webmaster} from '../classes/Webmaster';

/**
 * Set a person as webmaster
 */
export function setAsWebmaster (personData: IPerson): Promise<Webmaster> {
    var model = new MongoModel('webmaster');
    var deferred = Q.defer(); 
    model.insert({
        personId: personData.id
    }).then(function (webmasterData: WebmasterModel) {
        let webmaster = new Webmaster( new BasePerson( personData ) );
        deferred.resolve(webmaster);
    }).catch(returnServerError(deferred));
    return deferred.promise;
}