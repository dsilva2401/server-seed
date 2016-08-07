
// Imports
	import {Person} from './Person.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {Credential} from './Credential.ts';
	import {Session} from './Session.ts';
	import {MongoModel} from './MongoModel.ts';
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import * as Q from 'q';

// Exports
	export class PersonBE extends Person implements IBEModel {

		// Attributes
			public credential: Credential;
			public sessions: Session[];
			public model: MongoModel;

		// Constructor
			constructor (id: string);
			constructor (data: IPerson);
			constructor (dataOrId: IPerson | string) {
				// Id
				if (typeof dataOrId == 'string') {
					super();
					this.id = <string>dataOrId;
				} 
				// Person Data
				else {
					super(<IPerson>dataOrId);
					this.credential = new Credential(this.email);
				}
				this.model = new MongoModel('person');
				this.model.createIndex({email: 1}, {unique: true});
			}
			public load () {
				let deferred = Q.defer();
				let self = this;
				this.model.findOne({
					_id: this.id
				}).then(function (data?: IPerson) {
					if (data) {
						self.name = data.name;
						self.lastname = data.lastname;
						self.email = data.email;
						self.sex = data.sex;
						self.birthday = data.birthday;
						self.credential = new Credential(self.email);
						deferred.resolve(self.basicData());
					}
					deferred.reject({
						details: 'Id '+self.id+' not registered'
					});
				}).catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
			public save () {
				let deferred = Q.defer();
				let self = this;
				let data: IPerson = {
					name: this.name,
					lastname: this.lastname,
					sex: this.sex,
					email: this.email,
					birthday: this.birthday
				};
				this.model.updateOrCreate({email: this.email}, data)
				.then(function (personData: any) {
					if (personData && personData._id) self.id = personData._id;
					deferred.resolve(self.basicData());
				}).catch(function (err) {
					deferred.reject(err);
				})
				return deferred.promise;
			}
			public destroy () {
				return this.model.remove({
					email: this.email
				});
			}
			public addSession (keySize: number): Promise<Session> {
				let deferred = Q.defer();
				let session = new Session(this.id, keySize);
				session.save().then(function () {
					deferred.resolve(session);
				}).catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
	};