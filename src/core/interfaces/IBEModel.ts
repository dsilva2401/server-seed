
// Imports
	import {MongoModel} from '../classes/MongoModel.ts';

// Exports
	export interface IBEModel {

		// Attributes
			id: string;
			model: MongoModel;

		// Methods
			save(): Promise<any>;
			load?: () => Promise<any>;
			destroy?: () => Promise<any>;

	};