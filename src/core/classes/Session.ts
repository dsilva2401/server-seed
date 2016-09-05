
// Imports
	import {IBEModel} from '../interfaces/IBEModel.ts';
	import {MongoModel} from './MongoModel.ts';
	import {createSession} from '../db-transactions/Session.ts';
	import * as Q from 'q';

// Exports
	export class Session {

		// Attributes
			id: string;
			personId: string;
			key: string;

		// Constructor
			constructor (personId: string, key: string);
			constructor (personId: string, size: number);
			constructor (personId: string, keyOrSize: string | number) {
				this.personId = personId;
				if (typeof keyOrSize == 'string') {
					this.key = <string>keyOrSize;
				} else {
					let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys1234567890';
					this.key = '';
					for (let n=0; n<keyOrSize; n++) {
						this.key += abc[Math.floor(Math.random()*abc.length)];
					}
				}
			}

			save (): Promise<any> {
				return createSession(this.personId, this.key);
			}

	};