
// Imports
	import {MongoModel} from './MongoModel.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import {PersonBE} from './PersonBE.ts';
	import * as Q from 'q';

// Exports
	export class Credential implements IBEModel {

		// Attributes
			public id: string;
			public email: string;
			public password: string;
			public personModel: MongoModel;
			public model: MongoModel;

		// Constructor
			constructor (email: string, password?: string) {
				let self = this;
				this.email = email;
				if (password) this.password = password;
				this.personModel = new MongoModel('person');
				this.model = new MongoModel('credential');
				this.model.createIndex({email: 1}, {unique: true});
			}
			public load () {
				let deferred = Q.defer();
				let self = this;
				this.model.findOne({email: this.email})
				// Success
				.then(function (credentialData?: any) {
					if (credentialData) {
						self.password = credentialData.password;
						deferred.resolve();
					}
					deferred.reject({
						data: { email: self.email, password: self.password },
						details: 'Credential not registered'
					});
				}).catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
			public updatePassword (password: string) {
				this.password = password;
				return this.save();
			}
			public save () {
				let deferred = Q.defer();
				let self = this;
				this.model.updateOrCreate({email: this.email}, {
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
				this.model.findOne(q)
				// Success
				.then(function (credentialData?: any) {
					let owner = null;
					if (credentialData) owner = new PersonBE(credentialData._id);
					deferred.resolve(owner);
				})
				// Error
				.catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}

	};