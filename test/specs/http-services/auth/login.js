
// Imports
	var path = require('path');
	var expect = require('chai').expect;
	var request = require('request');

module.exports = function (test) {

	// Setup
		var service = new test.services.HTTPService('auth', 'login');

	// Tests
		describe('Login '+service.description, function () {

			it('Login with missing fields', function (done) {
				service.try({
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
			it('Login with invalid credentials', function (done) {
				service.try({
					email: 'invalidEmail',
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(401);
					done();
				});
			});
			it('Login with valid credentials', function (done) {
				service.try({
					email: test.data.person.email,
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(200);
					expect(response.cookies.uid).to.exist;
					expect(response.cookies.skey).to.exist;
					test.data.person.session.ownerId = response.cookies.uid;
					test.data.person.session.key = response.cookies.skey;
					done();
				});
			});

		});
}
