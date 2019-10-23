import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formContext from '../UIForm/context';
import { getValue, mutateValue } from '../UIForm/utils/properties';
import { validateSingle } from '../UIForm/utils/validation';
import { removeError, addError } from '../UIForm/utils/errors';

import theme from './Form.scss';

function useUIFormProperties(initialProperties, callback) {
	const [properties, setProperties] = useState(initialProperties);

	function onFormChange(event, { schema, value }) {
		const newProperties = mutateValue(properties, schema, value);
		setProperties(newProperties);
		if (callback) {
			callback(event, {
				schema,
				value,
				oldProperties: properties,
				properties: newProperties,
				formData: newProperties,
			});
		}
	}

	return [properties, onFormChange];
}

export default function Form({ children, onChange, onSubmit, initialProperties = {}, ...rest }) {
	const [properties, onFormChange] = useUIFormProperties(initialProperties, onChange);
	const [errors, setErrors] = useState({});

	const onFormSubmit = event => {
		if (!onSubmit) {
			return;
		}
		event.preventDefault();
		onSubmit(event, properties);
	};

	const onFormValidation = (event, { schema, value }) => {
		// get property value
		let newValue;
		if (value !== undefined) {
			newValue = value;
		} else {
			newValue = getValue(this.props.properties, schema);
		}

		const widgetErrors = validateSingle(schema, newValue, properties);
		const newErrors = Object.entries(widgetErrors).reduce((accu, [errorKey, errorValue]) => {
			const errorSchema = { key: errorKey };
			return errorValue ? addError(accu, errorSchema, errorValue) : removeError(accu, errorSchema);
		}, errors);
		setErrors(newErrors);
	};

	const contextValue = {
		onChange: onFormChange,
		onValidate: onFormValidation,
		properties,
		errors,
	};

	return (
		<formContext.Provider value={contextValue}>
			<form onSubmit={onFormSubmit} {...rest}>
				{typeof children === 'function' ? children(contextValue) : children}
			</form>
		</formContext.Provider>
	);
}
Form.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
	]),
	initialProperties: PropTypes.object,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
};

function Buttons({ children }) {
	return <div className={theme['tf-buttons']}>{children}</div>;
}
Buttons.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
Form.Buttons = Buttons;
