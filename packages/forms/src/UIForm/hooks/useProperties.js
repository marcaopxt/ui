import { useState } from 'react';
import { mutateValue } from '../utils/properties';

export default function useUIFormProperties(initialProperties, callback) {
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

	return { properties, onFormChange };
}
