
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
			public validate (): any {
				let required = ['name', 'lastname', 'email', 'birthday', 'sex'];
				let missing = [];
				let malformed = [];
				// Validate required
				for (let i=0; i<required.length; i++) {
					if (!this[required[i]]) missing.push(required[i]);
				}
				// Validate format
				let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!!!emailRegex.test(this.email)) malformed.push('email');
				// Results
				if (!missing.length && !malformed.length) return false;
				else return { missing: missing, malformed: malformed };
			}

	};