
// Imports
	import {IPerson} from '../interfaces/IPerson.ts';

// Exports
	export abstract class Person implements IPerson {

		// Attributes
			public id: string;
			public name: string;
			public lastname: string;
			public email: string;
			public birthday: Date;
			public sex: string;

		// Constructor
			constructor (personData?: IPerson) {
				if (personData) {
					this.name = personData.name;
					this.lastname = personData.lastname;
					this.email = personData.email;
					this.birthday = personData.birthday;
					this.sex = personData.sex;
				}
			}
			public basicData (): IPerson {
				return {
					id: this.id,
					name: this.name,
					lastname: this.lastname,
					sex: this.sex,
					birthday: this.birthday,
					email: this.email
				}
			}

	};