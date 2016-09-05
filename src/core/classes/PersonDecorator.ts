
import {IPerson} from '../interfaces/IPerson.ts';

export class PersonDecorator implements IPerson {

    // Attributes
        id: string;
		name: string;
		lastname: string;
		email: string;
		birthday: Date;
		sex: string;
        person: IPerson;
    
    // Methods
        constructor (person: IPerson) {
            this.person = person;
            this.id = person.id;
            this.name = person.name;
            this.lastname = person.lastname;
            this.email = person.email;
            this.birthday = person.birthday;
            this.sex = person.sex;
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

}