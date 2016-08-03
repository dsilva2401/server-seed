
// Imports
	var path = require('path');
	var expect = require('chai').expect;
	var request = require('request');

module.exports = function (test) {

	// Setup
		var service = new test.services.HTTPService('auth', 'login');

	// Tests
		describe('Login', function () {

			it('Login with missing fields', function () {});
			it('Login with invalid credentials', function () {});
			it('Login with valid credentials', function () {});

		});
}
