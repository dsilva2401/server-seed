
// Imports
	import {router as authRouter} from './auth.ts';
	import {router as apiRouter} from './api.ts';
	import {router as viewsRouter} from './views.ts';
	import {router as staticsRouter} from './statics.ts';
	import {config} from '../../../config.ts';

// Export setup routers function
	export function setupRouters (server: any) {
		server.use(config.httpRoutes.api.path, apiRouter);
		server.use(config.httpRoutes.auth.path, authRouter);
		server.use(config.httpRoutes.statics.path, staticsRouter);
		server.use(config.httpRoutes.views.path, viewsRouter);
	}