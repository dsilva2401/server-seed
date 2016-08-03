module.exports = function (test) {
	describe('Authentication', function () {

		require('./register.js')(test);
		require('./login.js')(test);

	});
}