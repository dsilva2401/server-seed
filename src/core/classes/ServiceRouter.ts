
// Imports
	import {config} from '../../config.ts';
	import {ExpressRouter} from './ExpressRouter.ts';
	import {ExpressController} from './ExpressController.ts';

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

			public addServiceController (name: string, ServiceController: any) {
				let serviceConfig = config.httpRoutes[this.name].services[name];
				this.addRoute(serviceConfig.method, serviceConfig.path, function (req, res, next) {
					let controller = new ServiceController(req, res, next);
				});
			}

	}