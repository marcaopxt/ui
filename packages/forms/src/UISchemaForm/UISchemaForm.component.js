import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import UIForm from '../UIForm/UIForm.component';
import { DefaultFormTemplate, TextModeFormTemplate } from '../UIForm/FormTemplate';
import { formPropTypes } from '../UIForm/utils/propTypes';
import merge from './merge';
import Widget from './Widget';
import Buttons from '../UIForm/fields/Button/Buttons.component';
import { I18N_DOMAIN_FORMS } from '../constants';
import '../translate';

function adaptActions(actions, onSubmitEnter, onSubmitLeave, properties) {
	let formActions = actions || [
		{
			bsStyle: 'primary',
			label: 'Submit',
			type: 'submit',
			widget: 'button',
			position: 'right',
		},
	];
	if (onSubmitEnter) {
		formActions = actions.map(action => {
			if (action.type === 'submit') {
				return {
					...action,
					onMouseEnter: event => onSubmitEnter(event, properties),
					onMouseLeave: onSubmitLeave,
				};
			}
			return action;
		});
	}
	return formActions;
}

export function UISchemaForm({
	actions,
	buttonBlockClass,
	getComponent,
	displayMode,
	id,
	jsonSchema,
	onSubmitEnter,
	onSubmitLeave,
	templates,
	uiSchema,
	updating,
	widgets,
	...rest
}) {
	const merged = useMemo(() => merge(jsonSchema, uiSchema), [jsonSchema, uiSchema]);
	if (!merged.mergedSchema) {
		return null;
	}

	function onFinish(event, { hasErrors, errors, schema, value }) {
		// TODO trigger must inject properties.errors back to the form COMPONENT
		// TODO in fact need to have a controlled
		// if (!hasErrors && schema.triggers && schema.triggers.length) {
		// 	let formData = this.props.properties;
		// 	if (value !== undefined) {
		// 		formData = mutateValue(formData, schema, value);
		// 	}
		// 	const trigger = schema.triggers.find(t => t.onEvent === undefined);
		// 	if (trigger) {
		// 		this.onTrigger(event, {
		// 			trigger,
		// 			schema,
		// 			properties: formData,
		// 			errors,
		// 			value,
		// 		});
		// 	}
		// }
	}

	function onActionClick(actionOnClick) {
		if (typeof actionOnClick === 'function') {
			return (event, data) =>
				actionOnClick(event, {
					...data,
					formData: this.props.properties,
					properties: this.props.properties,
				});
		}
		return () => {};
	}

	const formActions = useMemo(
		() => adaptActions(actions, onSubmitEnter, onSubmitLeave, {} /*properties*/),
		[actions, onSubmitEnter, onSubmitLeave, {} /*properties*/],
	);

	const formTemplate =
		this.props.displayMode === 'text' ? TextModeFormTemplate : DefaultFormTemplate;
	const widgetsRenderer = () =>
		merged.mergedSchema.map((nextSchema, index) => (
			<Widget
				id={id}
				key={index}
				schema={nextSchema}
				templates={templates}
				widgets={{ ...merged.widgets, widgets }}
				displayMode={displayMode}
				updating={updating}
			/>
		));
	const buttonsRenderer = () => {
		if (formActions.length === 0) {
			return null;
		}

		return (
			<UIForm.Buttons className="tf-actions-wrapper" key="form-buttons">
				<Buttons
					id={`${id}-actions`}
					onTrigger={this.onTrigger}
					className={buttonBlockClass}
					schema={{ items: formActions }}
					onClick={onActionClick}
					getComponent={getComponent}
				/>
			</UIForm.Buttons>
		);
	};

	return (
		<UIForm {...rest}>
			{formTemplate({ children: this.props.children, widgetsRenderer, buttonsRenderer })}
		</UIForm>
	);
}
UISchemaForm.displayName = 'TalendUIForm';
const I18NUIForm = withTranslation(I18N_DOMAIN_FORMS)(UISchemaForm);

if (process.env.NODE_ENV !== 'production') {
	I18NUIForm.propTypes = {
		...formPropTypes,

		/** Form definition: Json schema that specify the data model */
		jsonSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: UI schema that specify how to render the fields */
		uiSchema: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
		/**
		 *  Form definition: Form fields values.
		 *  Note that it should contains @definitionName for triggers.
		 */
		properties: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: The forms errors { [fieldKey]: errorMessage } */
		errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

		/**
		 * Actions buttons to display at the bottom of the form.
		 * If not provided, a single submit button is displayed.
		 */
		actions: PropTypes.arrayOf(Buttons.propTypes.schema),
		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/*
		 * Form definition: Custom formats
		 */
		customFormats: PropTypes.object,
		/**
		 * User callback: Trigger
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom templates */
		templates: PropTypes.object,
		/** Custom widgets */
		widgets: PropTypes.object,
		/** Display mode: example 'text' */
		displayMode: PropTypes.string,

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Set All fields validations errors */
		setErrors: PropTypes.func,
		getComponent: PropTypes.func,
		onSubmitEnter: PropTypes.func,
		onSubmitLeave: PropTypes.func,
	};
	UISchemaForm.propTypes = I18NUIForm.propTypes;
}

I18NUIForm.defaultProps = {
	noHtml5Validate: true,
	buttonBlockClass: 'form-actions',
	properties: {},
};
UISchemaForm.defaultProps = I18NUIForm.defaultProps;

export default I18NUIForm;
