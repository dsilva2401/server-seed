
// Imports
	import {IPerson} from '../interfaces/IPerson.ts';

// Exports
	export class BasePerson implements IPerson {

		// Attributes
			public id: string;
			public name: string;
			public lastname: string;
			public email: string;
			public birthday: Date;
			public sex: string;

		// Constructor
			constructor (personData: IPerson) {
				this.name = personData.name;
				this.lastname = personData.lastname;
				this.email = personData.email;
				this.birthday = personData.birthday;
				this.sex = personData.sex;
			}

	};