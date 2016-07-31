
// Imports
	import {Person} from './Person.ts';
	import {IPerson} from '../interfaces/IPerson.ts';
	import {Credential} from './Credential.ts';
	import {Session} from './Session.ts';

// Exports
	export class PersonBE extends Person {

		// Attributes
			credential: Credential;
			sessions: Session[];

		// Constructor
			constructor (id: string);
			constructor (data: IPerson);
			constructor (dataOrId: IPerson | string) {
				if (typeof dataOrId == 'string') {

				} else {
					super(<IPerson>dataOrId);
				}
			}

	};