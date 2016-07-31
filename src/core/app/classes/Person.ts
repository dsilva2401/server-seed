
// Imports
	import {IPerson} from '../interfaces/IPerson.ts';

// Exports
	export abstract class Person implements IPerson {

		// Attributes
			name: string;
			lastname: string;
			email: string;
			birthday: Date;
			sex: string;

		// Constructor
			constructor (personData: IPerson) {
				this.name = personData.name;
				this.lastname = personData.lastname;
				this.email = personData.email;
				this.birthday = personData.birthday;
				this.sex = personData.sex;
			}

	};