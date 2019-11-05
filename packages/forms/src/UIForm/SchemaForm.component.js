import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import UIForm from './UIForm.container';

import merge from '../UIForm/merge';
import Widget from './Widget';

export default function SchemaForm({ id, schema, children, ...props }) {
	const { jsonSchema, uiSchema, properties } = schema;
	const { mergedSchema } = useMemo(() => merge(jsonSchema, uiSchema), [jsonSchema, uiSchema]);
	return (
		<UIForm id={id} initialProperties={properties} {...props}>
			{mergedSchema.map((nextSchema, index) => (
				<Widget id={id} key={index} schema={nextSchema} />
			))}
			{children}
		</UIForm>
	);
}

SchemaForm.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	schema: PropTypes.shape({
		jsonSchema: PropTypes.object,
		uiSchema: PropTypes.object,
	}).isRequired,
};
