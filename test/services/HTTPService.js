
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
					var cookies = {};
			        (response.headers['set-cookie'] || []).forEach(function (cookieData) {
			            cookieData = cookieData.substring(0, cookieData.indexOf(';'));
			            cookieData = cookieData.split('=');
			            cookies[cookieData[0]] = cookieData[1];
			        });
					callbackHandler({
						body: response.body,
						statusCode: response.statusCode,
						cookies: cookies
					}, body);
				});

			}
		
		// Construct
			this.constructor(routerName, serviceName);
	}
}