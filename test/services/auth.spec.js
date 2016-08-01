
// Imports
	var expect = require("chai").expect;
	var request = require('request');
	var domain = 'http://localhost:8000';
	var data = require('../data.js');

// Setup
	describe('Authentication', function () {
		
		describe('Register', function () {
			
			// Register method
				var register = function (data, cb) {
					request({
						json: true,
						body: data,
						method: 'POST',
						url: domain+'/auth/register'
					}, function (error, response, body) {
						if (error) throw error;
						if (response.statusCode == 500) throw body;
						cb(response, body);
					});
				}

			// Tests
				it('Register new user', function (done) {
					register({
						name: 'Name',
						lastname: 'Lastame',
						email: 'email'+Math.random()+'@domain.com',
						birthday: new Date(),
						sex: 'male'
					},function (response, body) {
						expect(response.statusCode).to.equal(200);
						done();
					});
				});
				it('Register with invalid data', function (done) {
					register({
						name: 'Name',
						lastname: 'Lastame',
						email: 'invalidEmail',
						birthday: new Date(),
						sex: 'male'
					},function (response, body) {
						expect(response.statusCode).to.equal(400);
						done();
					});
				});
				it('Register an already registered user', function (done) {
					register({
						name: data.person.name,
						lastname: data.person.lastname,
						email: data.person.email,
						birthday: data.person.birthday,
						sex: data.person.sex
					},function (response, body) {
						expect(response.statusCode).to.equal(409);
						done();
					});
				});

		});

		/*describe('Login', function () {
			
			it('Login with invalid credentials', function () {});
			it('Login with valid credentials', function () {});
			it('Login with missing fields', function () {});

		});

		describe('Logout', function () {
			
			it('End session', function () {});

		});*/

	});