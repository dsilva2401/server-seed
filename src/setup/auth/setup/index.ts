
// Imports
	import * as express from 'express';
	import {PersonBE} from '../../../core/classes/PersonBE.ts';
	import {ServiceRouter} from '../../../core/classes/ServiceRouter.ts';
	import {Credential} from '../../../core/classes/Credential.ts';
	import {controller as registerController} from './register.ts';
	import {config} from '../../../config.ts';

// Export router setup function
	export function setupAuth (server: any) {

		// Init router
		var sRouter = new ServiceRouter('auth');


		/**
			=== Routes ===
		*/
			// Register
			sRouter.addService('register', registerController);
		

		// Add router to server
		server.use(sRouter.path, sRouter.router);

	}