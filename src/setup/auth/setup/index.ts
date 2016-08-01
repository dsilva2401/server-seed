
// Imports
	import * as express from 'express';
	import {PersonBE} from '../../../core/app/classes/PersonBE.ts';
	import {Credential} from '../../../core/app/classes/Credential.ts';

// Export router setup function
	export function setupAuth (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.post('/register', function (req, res, next) {
			let currentPerson = new PersonBE(req.body);
			// Data validation
				let errors = currentPerson.validate();
				if (errors) {
					res.status(400);
					res.json(errors);
					res.end();
					return;
				}
			// Verify if not exists
				let credential = new Credential(currentPerson.email);
				credential.getOwner()
				// Success
				.then(function (owner) {
					if (owner) {
						res.status(409);
						res.json({
							details: 'Already registered'
						});
						res.end();
						return;
					} 
					// Save register
						currentPerson.save()
						// Success
						.then(function (result) {
							res.status(200);
							res.json(result);
							res.end();
						})
						// Error
						.catch(function (err) {
							res.status(500);
							res.json(err);
							res.end();
						});
					
				})
				// Error
				.catch(function (err) {
					res.status(500);
					res.json(err);
					res.end();
				});
		});

		// Add router to server
		server.use('/auth', router);

	}