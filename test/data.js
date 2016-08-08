
// Init data object
	var data = {};

// Define data

	// Person
		data.person = {};
		data.person.name = 'Name';
		data.person.lastname = 'Lastname';
		data.person.sex = 'male';
		data.person.birthday = new Date();
		data.person.email = 'user@domain.com';
		data.person.password = 'password123';
		data.person.session = { ownerId: null, key: null };

// Exports
	module.exports = data;