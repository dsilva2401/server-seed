
// Imports
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import {MongoModel} from './MongoModel.ts';
	import * as Q from 'q';

// Exports
	export class Session implements IBEModel {

		// Attributes
			id: string;
			ownerId: string;
			key: string;
			model: MongoModel;

		// Constructor
			constructor (ownerId: string, key: string);
			constructor (ownerId: string, size: number);
			constructor (ownerId: string, keyOrSize: string | number) {
				this.ownerId = ownerId;
				if (typeof keyOrSize == 'string') {
					this.key = <string>keyOrSize;
				} else {
					let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys1234567890';
					this.key = '';
					for (let n=0; n<keyOrSize; n++) {
						this.key += abc[Math.floor(Math.random()*abc.length)];
					}
				}
				this.model = new MongoModel('session');
			}

			save (): Promise<any> {
				let deferred = Q.defer();
				let self = this;
				this.model.updateOrCreate({
					ownserId: this.ownerId,
					key: this.key
				}, {
					ownserId: this.ownerId,
					key: this.key
				}).then(function () {
					deferred.resolve();
				}).catch(function (err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}

	};