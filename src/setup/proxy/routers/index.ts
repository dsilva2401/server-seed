
// Imports
	import {router as authRouter} from './auth.ts';
	import {router as apiRouter} from './api.ts';
	import {router as viewsRouter} from './views.ts';
	import {router as staticsRouter} from './statics.ts';

// Export setup routers function
	export function setupRouters (server: any) {
		server.use('/api', apiRouter);
		server.use('/auth', authRouter);
		server.use('/statics', staticsRouter);
		server.use('/', viewsRouter);
	}