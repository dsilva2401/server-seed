
// Imports
	import {config} from '../../config.ts';
	import * as express from 'express';

// Exports
	export class ExpressRouter {

		// Attributes
			public path: string;
			public router: any;

		// Methods
			constructor (path: string) {
				this.path = path;
				this.router = express.Router();
			}
			public addRoute (method: string, path: string, handler: Function) {
				method = method.toLowerCase();
				this.router[method](path, handler);
			}

	}