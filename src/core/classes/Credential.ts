
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
			private personModel: MongoModel;
			private credentialModel: MongoModel;

		// Constructor
			constructor (email: string, password?: string) {
				let self = this;
				this.email = email;
				if (password) this.password = password;
				this.personModel = new MongoModel('person');
				this.credentialModel = new MongoModel('credential');
				this.credentialModel.createIndex({email: 1}, {unique: true});
				if (!password) this.load();
			}
			private load () {
				let self = this;
				this.credentialModel.findOne({email: this.email})
				// Success
				.then(function (credentialData?: any) {
					if (credentialData) {
						self.password = credentialData.password;
					}
				});
			}
			public updatePassword (password: string) {
				this.password = password;
				return this.save();
			}
			public save () {
				let deferred = Q.defer();
				let self = this;
				this.credentialModel.updateOrCreate({email: this.email}, {
					email: this.email,
					password: this.password
				})
				.then(function (personData: any) {
					deferred.resolve();
				}).catch(function (err) {
					deferred.reject(err);
				})
				return deferred.promise;
			}
			public getOwner () {
				let deferred = Q.defer();
				let q: any = {};
				q.email = this.email;
				if (this.password) q.password = this.password;
				this.credentialModel.findOne(q)
				// Success
				.then(function (owner?: any) {
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