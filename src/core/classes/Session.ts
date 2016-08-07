
// Exports
	export class Session {

		// Attributes
			ownerId: string;
			key: string;

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
			}

	};