export default function SchemaBuilder() {
	const schema = {};
	function createInternalSchema() {
		if (!schema.schema) {
			schema.schema = {};
		}
	}

	return {
		setKey(key) {
			if (typeof key === 'string') {
				schema.key = key.split('.');
			} else if (Array.isArray(key)) {
				schema.key = key;
			} else {
				throw new Error('Invalid key, expected an array of string or a string.');
			}
			return this;
		},
		setPattern(pattern) {
			createInternalSchema();
			schema.schema.pattern = pattern;
			return this;
		},
		setPrimitiveType(type) {
			createInternalSchema();
			schema.schema.type = type;
			return this;
		},
		setRequired(required = true) {
			schema.required = required;
			return this;
		},
		setType(type) {
			schema.type = type;
			return this;
		},
		build() {
			return schema;
		},
	};
}
