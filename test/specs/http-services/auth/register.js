
// Imports
	var path = require('path');
	var expect = require('chai').expect;
	var request = require('request');

module.exports = function (test) {

	// Setup
		var service = new test.services.HTTPService('auth', 'register');

	// Tests
		describe('Register '+service.description, function () {

			it('Register new user', function (done) {
				service.try({
					name: 'Name',
					lastname: 'Lastname',
					email: 'email'+Math.random()+'@domain.com',
					birthday: new Date(),
					sex: 'male',
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
			it('Register with invalid data', function (done) {
				service.try({
					name: 'Name',
					lastname: 'Lastame',
					email: 'invalidEmail',
					birthday: new Date(),
					sex: 'male',
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
			it('Register an already registered user', function (done) {
				service.try({
					name: test.data.person.name,
					lastname: test.data.person.lastname,
					email: test.data.person.email,
					birthday: test.data.person.birthday,
					sex: test.data.person.sex,
					password: test.data.person.password
				},function (response, body) {
					expect(response.statusCode).to.equal(409);
					done();
				});
			});
		});
}
