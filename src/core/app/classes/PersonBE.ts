
// Imports
	import {Person} from './Person.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {Credential} from './Credential.ts';
	import {Session} from './Session.ts';
	import {MongoModel} from '../services/database.ts';

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
				if (typeof dataOrId == 'string') {
					super();
					this.id = <string>dataOrId;
					this.load();
				} else {
					super(<IPerson>dataOrId);
				}
				this.personModel = new MongoModel('person');
				this.personModel.createIndex({email: 1}, {unique: true});
			}
			private load () {
				let self = this;
				this.personModel.findOne({
					_id: this.id
				}).then(function (data: IPerson) {
					self.name = data.name;
					self.lastname = data.lastname;
					self.email = data.email;
					self.sex = data.sex;
					self.birthday = data.birthday;
				});
			}
			public save () {
				let data: IPerson = {
					name: this.name,
					lastname: this.lastname,
					sex: this.sex,
					email: this.email,
					birthday: this.birthday
				};
				return this.personModel.insert(data);
			}

	};