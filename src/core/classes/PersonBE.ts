
// Imports
	import {PersonDecorator} from './PersonDecorator.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {Credential} from './Credential.ts';
	import {Session} from './Session.ts';
	import {MongoModel} from './MongoModel.ts';
	import {
		updateOrCreatePerson,
		createPersonIndexes
	} from '../db-transactions/Person.ts';
	import {Person as PersonModel} from '../db-models/Person.ts';
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import * as Q from 'q';

// Exports
	export class PersonBE extends PersonDecorator {

		// Attributes
			public credential: Credential;
			public sessions: Session[];

		// Constructor
			constructor (person: IPerson) {
				super(person);
				this.credential = new Credential(this.email);
				createPersonIndexes();
			}
			public save () {
				var deferred = Q.defer();
				updateOrCreatePerson({
					name: this.name,
					lastname: this.lastname,
					sex: this.sex,
					email: this.email,
					birthday: this.birthday
				}).then((personData: PersonModel) => {
					if (personData && personData._id) this.id = personData._id;
					deferred.resolve(this.basicData());
				}).catch(deferred.reject);
				return deferred.promise;
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