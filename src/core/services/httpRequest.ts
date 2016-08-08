
// Imports
	import * as request from 'request';
	import * as Q from 'q';
	import {IHTTPResponse} from '../interfaces/IHTTPResponse.ts';

// Exports
	export function httpRequest (
		method: string,
		url: string,
		options?: {
			data?: any,
			cookies?: any
		}
	) {

		// Init
		let deferred = Q.defer();

		// Setup cookies
		let jar = request.jar();
		if (options && options.cookies) {
			Object.keys(options.cookies).forEach(function (cookieKey) {
				jar.setCookie(request.cookie(cookieKey+'='+options.cookies[cookieKey]), url);
			});
		}

		// Setup request options
		let reqOptions: any = {};
		reqOptions.jar = jar;
		reqOptions.url = url;
		reqOptions.method = method;
		reqOptions.json = true;
		if (options && options.data) reqOptions.body = options.data;

		// Handler
		request(reqOptions, function (error, response, body) {
			if (error) {
				deferred.reject(error);
				return;
			}
			let cookies = {};
			(response.headers['set-cookie'] || []).forEach(function (cookieData) {
				cookieData = cookieData.substring(0, cookieData.indexOf(';'));
				cookieData = cookieData.split('=');
				cookies[cookieData[0]] = cookieData[1];
			});
			let httpResp: IHTTPResponse = {
				statusCode: response.statusCode,
				headers: response.headers,
				body: body,
				cookies: cookies
			}
			deferred.resolve(httpResp);
		});

		return deferred.promise;
	}
