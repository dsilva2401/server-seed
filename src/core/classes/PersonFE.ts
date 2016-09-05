
// Imports
	import {PersonDecorator} from './PersonDecorator.ts';
	import {IPerson} from '../interfaces/IPerson.ts';

// Exports
	export class PersonFE extends PersonDecorator {

		// Attributes
			

		// Constructor
			constructor (person: IPerson) {
				super(person);
			}

	};