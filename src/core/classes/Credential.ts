
// Imports
	import {MongoModel} from './MongoModel.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import {PersonBE} from './PersonBE.ts';
	import {Person as PersonModel} from '../db-models/Person.ts';
	import * as Q from 'q';
	import {
		getOwnerDataFromCredentials,
		updateOrCreateCredential,
		createCredentialsIndexes
	} from '../db-transactions/Credential.ts';

// Exports
	export class Credential {

		// Attributes
			public id: string;
			public email: string;
			public password: string;

		// Constructor
			constructor (email: string, password?: string) {
				this.email = email;
				this.password = password;
				createCredentialsIndexes();
			}
			public updatePassword (password: string) {
				this.password = password;
				return this.save();
			}
			public save () {
				return updateOrCreateCredential(this.email, this.password);
			}
			public getOwner (): Promise<PersonBE> {
				var deferred = Q.defer();
				getOwnerDataFromCredentials(this.email, this.password).then(function (personData: IPerson) {
					if (!personData) deferred.resolve();
					else deferred.resolve(new PersonBE(personData));
				}).catch(deferred.reject);
				return deferred.promise;
			}

	};