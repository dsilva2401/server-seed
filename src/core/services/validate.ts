
// Imports
	import {Validator} from 'jsonschema';

// Exports
	export function validate (element: any, schema: any) {
        let v = new Validator();
        return v.validate(element, schema);
	}
