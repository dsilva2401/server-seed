
var path = require('path');
var expect = require('chai').expect;
var request = require('request');

module.exports = function (data, serverConfig) {
	var domain = 'http://localhost:8000';
	return function (routerName, serviceName) {

		// Attributes
			this.routerName;
			this.serviceName;
			this.description;
			this.service;

		// Methods
			this.constructor = function (routerName, serviceName) {
				this.routerName = routerName;
				this.serviceName = serviceName;
				this.service = serverConfig.httpRoutes[this.routerName].services[this.serviceName];
				this.description = '('+this.service.method+' => '+this.service.url+')';
			}

			this.try = function (tryData, callbackHandler) {
				request({
					json: true,
					body: tryData,
					method: this.service.method,
					url: domain+this.service.url
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