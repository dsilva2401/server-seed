
// Imports
	import {setupViews} from './views.ts';
	import {setupAPI} from './api.ts';
	import {setupAuth} from './auth.ts';
	import {setupStatics} from './statics.ts';

// Export setup routers function
	export function setupRouters (server: any) {
		setupAPI(server);
		setupAuth(server);
		setupStatics(server);
		setupViews(server);
	}