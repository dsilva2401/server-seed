
// Imports
	import {config} from '../../config.ts';
	import {MongoClient} from 'mongodb';
	import * as mongoose from 'mongoose';
	import * as Q from 'q';
	// import * as promisedMongo from 'promised-mongo';
	// import promisedMongo = require('promised-mongo');

// Setup
	// console.log(mongoose);
	let db: any;
	setTimeout(function () {
		MongoClient.connect(config.servers.database.url, function (err, _db) {
			if (err) throw err;
			db = _db;
			console.log('Connected succesfully to mongodb');
		});
	}, 1000);

// Exports
	export class MongoModel {

		// Attributes
			private name: string;
			private collection: any;


		// Methods
			constructor (name: string) {
				this.name = name;
				this.collection = db.collection(name);
			}

			public createIndex (fields: any, options: any) {
				this.collection.createIndex(fields, options);
			}

			public insert (data: any) {
				let deferred = Q.defer();
				this.collection.insert(data, function (err, resp) {
					if (err) {
						deferred.reject(err);
						return;
					}
					deferred.resolve(resp.ops[0]);
				});
				return deferred.promise;
			}

			public updateOrCreate (criteria: any, data: any) {
				let deferred = Q.defer();
				this.collection.update(criteria, data, {
					upsert: true
				}, function (err, resp) {
					if (err) {
						deferred.reject(err);
						return;
					}
					// resp.result.upserted = resp.result.upserted || [];
					var r: any = {};
					if (
						resp.result.upserted &&
						resp.result.upserted[0] &&
						resp.result.upserted[0]._id
					) r._id = resp.result.upserted[0]._id.toString();
					deferred.resolve(r);
				});
				return deferred.promise;
			}

			public findOne (criteria: any) {
				let deferred = Q.defer();
				this.collection.findOne(criteria, function (err, resp) {
					if (err) {
						deferred.reject(err);
						return;
					}
					deferred.resolve(resp);
				});
				return deferred.promise;
			}
			public remove (criteria: any) {
				let deferred = Q.defer();
				this.collection.remove(criteria, function (err, resp) {
					if (err) {
						deferred.reject(err);
						return;
					}
					deferred.resolve(resp);
				});
				return deferred.promise;
			}

	}