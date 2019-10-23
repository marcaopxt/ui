import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formContext from './context';
import useProperties from './hooks/useProperties';
import useLanguage from './hooks/useLanguage';
import useValidation from './hooks/useValidation';
import { getValue } from '../UIForm/utils/properties';

import theme from './UIForm.scss';

export default function UIForm({
	children,
	customFormats,
	language,
	onChange,
	onErrors,
	onValidate,
	onSubmit,
	initialProperties = {},
	...rest
}) {
	const formRef = useRef(null);
	useLanguage({ customFormats, language });
	const { properties, onFormChange } = useProperties(initialProperties, onChange);
	const { errors, validate, validateAll, registerValidation, deregisterValidation } = useValidation(
		onErrors,
	);

	const onFormValidation = (event, { schema, value }, options) => {
		// get property value
		const payload = { schema, value: value !== undefined ? value : getValue(properties, schema) };
		const hasErrors = validate(event, payload, options);
		onValidate(event, { ...payload, hasErrors, errors });
	};

	const onFormSubmit = event => {
		const isValid = validateAll(properties);
		if (!isValid) {
			event.preventDefault();
			return;
		}

		if (!onSubmit) {
			return;
		}
		event.preventDefault();
		onSubmit(event, properties);
	};

	const contextValue = {
		onChange: onFormChange,
		onValidate: onFormValidation,
		properties,
		errors,

		registerValidation,
		deregisterValidation,
	};

	return (
		<formContext.Provider value={contextValue}>
			<form
				className={classNames('tf-uiform', theme.uiform, this.props.className)}
				onSubmit={onFormSubmit}
				ref={formRef}
				{...rest}
			>
				{typeof children === 'function' ? children(contextValue) : children}
			</form>
		</formContext.Provider>
	);
}
UIForm.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
	]),
	customFormats: PropTypes.object,
	language: PropTypes.object,
	initialProperties: PropTypes.object,
	onChange: PropTypes.func,
	onErrors: PropTypes.func,
	onSubmit: PropTypes.func,
	onValidate: PropTypes.func,
};

function Buttons({ className, children }) {
	return <div className={`theme['tf-buttons'] ${className}`}>{children}</div>;
}
Buttons.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	className: PropTypes.string,
};
UIForm.Buttons = Buttons;
