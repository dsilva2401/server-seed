
// Imports
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';

// Exports
	export function controller (req, res, next) {

		// Validate required fields
		if (!req.body.email || !req.body.password) {
			res.status(400);
			var missingField = (req.body.email ? 'password' : 'email');
			res.json({
				missingFields: [missingField]
			});
			res.end();
			return;
		}
		let credential = new Credential(req.body.email, req.body.password);
		credential.getOwner().then(function (owner?: PersonBE) {
			if (!owner) {
				res.status(401);
				res.json({
					details: 'Invalid credentials'
				});
				res.end();
				return;
			}
			res.status(200);
			res.json(owner.basicData());
			res.end();
		});

	};