
// Imports
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';

// Exports
	export function controller (req, res, next) {
		let currentPerson = new PersonBE(req.body);
		// Data validation
			let errors = currentPerson.validate();
			if (errors || !req.body.password) {
				res.status(400);
				res.json(errors);
				res.end();
				return;
			}
		// Verify if not exists
			let credential = new Credential(currentPerson.email);
			credential.getOwner()
			// Success getting owner
			.then(function (owner?: PersonBE) {
				if (owner) {
					res.status(409);
					res.json({
						details: 'Already registered'
					});
					res.end();
					return;
				} 
				// Save current person data
					currentPerson.save()
					// Success saving current person
					.then(function () {
						currentPerson.credential.updatePassword(req.body.password)
						// Success updating password
						.then(function () {
							res.status(200);
							res.json(
								currentPerson.basicData()
							);
							res.end();
						})
						// Error updating password
						.catch(function (err) {
							currentPerson.destroy();
							res.status(500);
							res.json(err);
							res.end();
						});	
					})
					// Error saving current person
					.catch(function (err) {
						res.status(500);
						res.json(err);
						res.end();
					});
				
			})
			// Error getting owner
			.catch(function (err) {
				res.status(500);
				res.json(err);
				res.end();
			});
	};