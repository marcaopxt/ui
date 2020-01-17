import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';
import updateValues from '../internal/data';
import { updateErrors, getError } from '../internal/error';

import { I18N_DOMAIN_FORMS } from '../../constants';

function getTriggerHandlers(schema, onTrigger, rhf) {
	const { triggers = [] } = schema;
	if (!onTrigger && triggers.length) {
		console.error(
			'Your form defines triggers, but no onTrigger handler is provided. Those triggers will be ignored but this might not be what you wanted.',
		);
		return {};
	}

	const eventsProps = {};
	triggers.forEach(trigger => {
		function executeTrigger() {
			return Promise.resolve()
				.then(() =>
					onTrigger({
						schema,
						trigger,
						errors: rhf.errors,
						properties: rhf.getValues({ nest: true }),
					}),
				)
				.then((result = {}) => {
					const { properties, errors } = result;
					const newErrors = typeof errors === 'function' ? errors(rhf.errors) : errors;

					if (properties) {
						updateValues(rhf, properties);
					}
					if (newErrors) {
						updateErrors(rhf, newErrors);
					}
					return { ...result, errors: newErrors };
				});
		}

		if (trigger.validation) {
			eventsProps.validation = () =>
				executeTrigger().then(({ errors }) => getError(errors, schema));
			return;
		}
		switch (trigger.onEvent) {
			case 'focus': {
				eventsProps.onFocus = executeTrigger;
				break;
			}
			case 'blur': {
				eventsProps.onBlur = executeTrigger;
				break;
			}
			case 'change': {
				eventsProps.onChange = executeTrigger;
				break;
			}
			case 'input': {
				eventsProps.onInput = executeTrigger;
				break;
			}
			default:
				break;
		}
	});
	return eventsProps;
}

export default function useSchemaWidget(schema) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const contextValue = useContext(SchemaFormContext);
	const { customFormats, customValidation, language, onTrigger, rhf } = contextValue;
	const { validation: validationTrigger, ...eventsProps } = useMemo(
		() => getTriggerHandlers(schema, onTrigger, rhf),
		[schema, onTrigger],
	);
	const rules = useMemo(
		() =>
			schemaRules({ customFormats, customValidation, validationTrigger, language, rhf, schema, t }),
		[customFormats, customValidation, validationTrigger, language, rhf, schema, t],
	);

	const values = useMemo(
		() => ({
			...contextValue,
			eventsProps,
			rules,
		}),
		[contextValue, eventsProps, rules],
	);
	return values;
}