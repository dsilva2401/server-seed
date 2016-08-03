
// Imports
	var path = require('path');
	var expect = require('chai').expect;
	var request = require('request');

module.exports = function (test) {

	// Setup
		var service = new test.services.HTTPService('auth', 'logout');

	// Tests
		describe('Logout '+service.description, function () {

			it('Login service', function () {});

		});
}
