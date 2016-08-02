
// Imports
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';

// Exports
	export function controller (req, res, next) {
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
	};