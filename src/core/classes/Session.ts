
// Exports
	export class Session {

		// Attributes
			key: string;

		// Constructor
			constructor (key: string);
			constructor (size: number);
			constructor (keyOrSize: string | number) {
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