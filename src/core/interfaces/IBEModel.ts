
// Imports
	import {MongoModel} from '../classes/MongoModel.ts';

// Exports
	export interface IBEModel {

		// Attributes
			model: MongoModel;

		// Methods
			load(): Promise<any>;
			save(): Promise<any>;
			destroy?: () => Promise<any>;

	};