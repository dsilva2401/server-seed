
// Imports
	import {config} from '../../config.ts';
	import {ExpressRouter} from './ExpressRouter.ts';

// Exports
	export class ServiceRouter extends ExpressRouter {

		// Attributes
			name: string;

		// Methods
			constructor (name: string) {
				let routerConfig = config.httpRoutes[name];
				super(routerConfig.path);
				this.name = name;
			}

			public addService (name: string, handler: Function) {
				let serviceConfig = config.httpRoutes[this.name].services[name];
				this.addRoute(serviceConfig.method, serviceConfig.path, handler);
			}

	}