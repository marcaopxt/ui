import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { sfPath } from '@talend/json-schema-form-core';
import { getValue } from '../../../UIForm/utils/properties';
import formContext from '../../context';
import Input from '../Input';

const widgetDictionary = {
	number: Input,
	password: Input,
	text: Input,
};

export default function Widget({ id, schema }) {
	const { properties } = useContext(formContext);
	const WidgetComponent = widgetDictionary[schema.widget || schema.type];
	const value = getValue(properties, schema);
	const widgetId = sfPath.name(schema.key, '_', id);

	return <WidgetComponent id={widgetId} schema={schema} value={value} />;
}
Widget.propTypes = {
	id: PropTypes.string,
	schema: PropTypes.object,
};
