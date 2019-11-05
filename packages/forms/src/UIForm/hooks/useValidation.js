import { useState } from 'react';
import { validateSingle, validateAll } from '../utils/validation';
import { removeError, addError } from '../utils/errors';

export default function useValidation(callback) {
	const [errors, setErrors] = useState({});
	const [schemas, setSchemas] = useState([]);

	function hookValidate(
		event,
		{ schema, value },
		{ deepValidation = false, widgetChangeErrors } = {},
	) {
		// validate value. This validation can be deep if schema is an object or an array
		let newErrors = validateSingle(
			schema,
			value,
			this.props.properties,
			this.props.customValidation,
			deepValidation,
		);
		const hasErrors = Object.values(newErrors).find(Boolean);

		// update errors map
		newErrors = Object.entries(newErrors).reduce((accu, [errorKey, errorValue]) => {
			const errorSchema = { key: errorKey };
			return errorValue ? addError(accu, errorSchema, errorValue) : removeError(accu, errorSchema);
		}, errors);

		// widget error modifier
		if (widgetChangeErrors) {
			newErrors = widgetChangeErrors(newErrors);
		}

		setErrors(newErrors);
		if (callback) {
			callback(event, errors);
		}

		return hasErrors;
	}

	function hookValidateAll(properties) {
		const mergedSchema = schemas.map(({ schema }) => schema);
		function customValidation(...args) {
			const fn = schemas.find(({ schema }) => schema === args.schemaToValidate);
			return fn ? fn(...args) : null;
		}
		let newErrors = validateAll(mergedSchema, properties, customValidation);

		Object.entries(errors)
			.filter(entry => entry[0] in newErrors)
			.reduce((accu, [key, value]) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = value;
				return accu;
			}, newErrors);

		newErrors = Object.entries(newErrors)
			.filter(entry => entry[1])
			.reduce((accu, [key, value]) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = value;
				return accu;
			}, {});

		const isValid = !Object.keys(newErrors).length;

		setErrors(newErrors);
		if (callback) {
			callback(event, newErrors);
		}
		//TODO: focus first error

		/*
focusFirstError() {
		if (!this.formRef) {
			return;
		}

		const elementWithError = this.formRef.querySelector('[aria-invalid="true"]');

		if (elementWithError) {
			elementWithError.focus();
		}
	}
		*/

		return isValid;
	}

	function registerValidation(schemaToValidate, customValidation) {
		setSchemas([...schemas, { schema: schemaToValidate, customValidation }]);
	}

	function deregisterValidation(schemaToRemove) {
		setSchemas(schemas.filter(({ schema }) => schema !== schemaToRemove));
	}

	return {
		errors,
		validate: hookValidate,
		validateAll: hookValidateAll,
		registerValidation,
		deregisterValidation,
	};
}
