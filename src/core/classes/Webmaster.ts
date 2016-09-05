
import {PersonDecorator} from './PersonDecorator.ts';
import {IPerson} from '../interfaces/IPerson.ts';

export class Webmaster extends PersonDecorator {

    // Attributes
        
    // Methods
        constructor (person: IPerson) {
            super(person);
        }

} 