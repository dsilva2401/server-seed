
// Imports
	import {Error} from '../interfaces/Error.ts';

// Exports
	export function returnServerError (deferred: any) {
		return function (serverError: any) {
			let error: Error = {
				httpStatus: 500,
				description: 'Internal error',
				error: serverError
			};
			deferred.reject(error);
		}
	}
