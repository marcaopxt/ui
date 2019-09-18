import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formContext from './context';
import { mutateValue } from '../UIForm/utils/properties';
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

	const onFormSubmit = event => {
		if (!onSubmit) {
			return;
		}
		event.preventDefault();
		onSubmit(event, properties);
	};

	const contextValue = {
		onChange: onFormChange,
		onFinish(...args) {
			console.log('Finish', args);
		},
		properties,
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
