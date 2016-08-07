
// Imports
	import {IPerson} from '../../../core/interfaces/IPerson.ts';
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {ExpressController} from '../../../core/classes/ExpressController.ts';
	import * as Q from 'q';

// Exports
	export class RegisterController extends ExpressController {

		// Attributes

		// Methods
			constructor (req, res, next) {
				super(req, res, next);
				let self = this;

				// Validation
				let errors = this.validateData(req.body);
				if (errors) {
					this.sendResponse(400, errors);
					return;
				}

				// Verify if user already exists
				this.searchPerson(req.body.email).then(function (person) {
					if (person) {
						self.sendResponse(409, {
							details: 'Already registered'
						});
						return;
					}

					// Register person
					self.registerPerson(req.body).then(function (person: PersonBE) {

						// Update person password
						self.setPersonPassword(person, req.body.password).then(function (person: PersonBE) {
							self.sendResponse(200, person.basicData());
						});

					});
				});

			}

			validateData (data) {
				if (!data.password) {
					return { missingFields: 'password' }
				}
				let tempPerson = new PersonBE(data);
				return tempPerson.validate();
			}

			searchPerson (email: string): Promise<PersonBE> {
				let deferred = Q.defer();
				let tempCredential = new Credential(email);
				tempCredential.getOwner().then(function (owner?: PersonBE) {
					return deferred.resolve(owner);
				}).catch(this.sendError);
				return deferred.promise;
			}

			registerPerson (personData: IPerson): Promise<PersonBE> {
				let deferred = Q.defer();
				let person = new PersonBE(personData);
				person.save().then(function () {
					deferred.resolve(person);
				}).catch(this.sendError);
				return deferred.promise;
			}

			setPersonPassword (person: PersonBE, password: string): Promise<any> {
				let deferred = Q.defer();
				person.credential.updatePassword(password).then(function () {
					deferred.resolve(person);
				}).catch(this.sendError);
				return deferred.promise;
			}

	}
	