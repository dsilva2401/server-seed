
var path = require('path');
var expect = require('chai').expect;
var request = require('request');

module.exports = function (data, serverConfig) {
	var domain = 'http://localhost:8000';
	return function (routerName, serviceName) {

		// Attributes
			this.routerName;
			this.serviceName;

		// Methods
			this.constructor = function (routerName, serviceName) {
				this.routerName = routerName;
				this.serviceName = serviceName;
			}

			this.try = function (tryData, callbackHandler) {
				var service = serverConfig.httpRoutes[this.routerName].services[this.serviceName];
				request({
					json: true,
					body: tryData,
					method: service.method,
					url: domain+service.url
				}, function (error, response, body) {
					if (error) throw error;
					if (response.statusCode == 500) throw body;
					callbackHandler(response, body);
				});
			}
		
		// Construct
			this.constructor(routerName, serviceName);
	}
}