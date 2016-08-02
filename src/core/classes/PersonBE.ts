
// Imports
	import {Person} from './Person.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {Credential} from './Credential.ts';
	import {Session} from './Session.ts';
	import {MongoModel} from './MongoModel.ts';
	import * as Q from 'q';

// Exports
	export class PersonBE extends Person {

		// Attributes
			public credential: Credential;
			public sessions: Session[];
			private personModel: MongoModel;

		// Constructor
			constructor (id: string);
			constructor (data: IPerson);
			constructor (dataOrId: IPerson | string) {
				// Id
				if (typeof dataOrId == 'string') {
					super();
					this.id = <string>dataOrId;
					this.load();
				} 
				// Person Data
				else {
					super(<IPerson>dataOrId);
					this.credential = new Credential(this.email);
				}
				this.personModel = new MongoModel('person');
				this.personModel.createIndex({email: 1}, {unique: true});
			}
			private load () {
				let self = this;
				this.personModel.findOne({
					_id: this.id
				}).then(function (data?: IPerson) {
					if (data) {
						self.name = data.name;
						self.lastname = data.lastname;
						self.email = data.email;
						self.sex = data.sex;
						self.birthday = data.birthday;
						self.credential = new Credential(self.email);
					}
				});
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
				this.personModel.updateOrCreate({email: this.email}, data)
				.then(function (personData: any) {
					if (personData && personData._id) self.id = personData._id.toString();
					deferred.resolve();
				}).catch(function (err) {
					deferred.reject(err);
				})
				return deferred.promise;
			}
			public destroy () {
				return this.personModel.remove({
					email: this.email
				});
			}
	};