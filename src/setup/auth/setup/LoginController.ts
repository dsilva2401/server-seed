
// Imports
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Session} from '../../../core/classes/Session.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {ExpressController} from '../../../core/classes/ExpressController.ts';
	import * as Q from 'q';
	import {getOwnerDataFromCredentials} from '../../../core/db-transactions/Credential.ts';

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
					self.createSession(person, 30).then(function () {
						self.sendResponse(200, {});
					});
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

			createSession (person: PersonBE, keySize: number) {
				let deferred = Q.defer();
				let self = this;
				person.addSession(30).then(function (session: Session) {
					self.addCookies({
						uid: session.personId,
						skey: session.key
					})
					deferred.resolve();
				}).catch(this.sendError);
				return deferred.promise;
			}

	}