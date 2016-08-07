
// Imports
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {ExpressController} from '../../../core/classes/ExpressController.ts';
	import * as Q from 'q';

// Exports
	export class LoginController extends ExpressController {

		// Attributes

		// Methods
			constructor (req, res, next) {
				super(req, res, next);
				let self = this;
				
				// Validation
				let errors = this.validateData(req.body, {
					email: { type: 'string', test: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
					password: { type: 'string'}
				});
				if (errors) {
					this.sendResponse(400, errors);
					return;
				}

				// Verify if valid credentials
				this.searchPerson(req.body.email, req.body.password).then(function (person?: PersonBE) {

					// Invalid credentials
					if (!person) {
						self.sendResponse(401, {
							details: 'Invalid credentials'
						});
						return;
					}

					// Valid credentials
					person.addSession(30);
					self.sendResponse(200, person.basicData());
				});

			}

			searchPerson (email: string, password: string): Promise<PersonBE> {
				let deferred = Q.defer();
				let credential = new Credential(email, password);
				credential.getOwner().then(function (owner?: PersonBE) {
					deferred.resolve(owner);
				}).catch(this.sendError);
				return deferred.promise;
			}



	}