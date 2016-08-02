
// Imports
	import {MongoModel} from './MongoModel.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {PersonBE} from './PersonBE.ts';
	import * as Q from 'q';

// Exports
	export class Credential {

		// Attributes
			public email: string;
			public password: string;
			private personModel: any;

		// Constructor
			constructor (email: string, password?: string) {
				this.email = email;
				if (password) this.password = password;
				this.personModel = new MongoModel('person');
			}
			public getOwner () {
				let deferred = Q.defer();
				this.personModel.findOne({ email: this.email })
				// Success
				.then(function (owner) {
					owner = (owner ? (new PersonBE(owner)) : null);
					deferred.resolve(owner);
				})
				// Error
				.catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}

	};