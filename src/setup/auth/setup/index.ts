
// Imports
	import * as express from 'express';
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {controller as registerController} from './register.ts';

// Export router setup function
	export function setupAuth (server: any) {

		// Init router
		var router = express.Router();

		// Setup routes
		router.post('/register', registerController);

		// Add router to server
		server.use('/auth', router);

	}