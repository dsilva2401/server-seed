
// Imports
	import {IPerson} from '../../../core/interfaces/IPerson.ts';
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Error} from '../../../core/interfaces/Error.ts';
	import {Person as PersonModel} from '../../../core/db-models/Person.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {ExpressController} from '../../../core/classes/ExpressController.ts';
	import {registerPerson} from '../../../core/db-transactions/Person.ts';
	import * as Q from 'q';

// Exports
	export class RegisterController extends ExpressController {

		// Attributes

		// Methods
			constructor (req, res, next) {
				super(req, res, next);
				registerPerson(req.body)
				// Successful register
				.then((personData: PersonModel) => {
					this.sendResponse(200, personData);
				})
				// Error on register
				.catch((error: Error) => {
					this.sendResponse(error.httpStatus, error);
				});
			}

	}
	