var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost/test', function (err, db) {
    if (err) throw err;

    var collection = db.collection('collection');
    
    // Upsert
	collection.update({
		email: 1234
	}, {
		email: 123,
		password: 4567
	}, {
		upsert: true,
		new: true
	}, function (err, r) {
		var reslt = r.result;
		// if (result)
	});

});