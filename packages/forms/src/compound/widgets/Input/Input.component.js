import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import formContext from '../../context';
import { generateDescriptionId, generateErrorId } from '../../../UIForm/Message/generateId';
import FieldTemplate from '../../../UIForm/fields/FieldTemplate';
import { convertValue } from '../../../UIForm/utils/properties';

function Input(props) {
	const {
		description,
		disabled = false,
		id,
		isValid,
		errorMessage,
		label,
		onChange,
		onBlur,
		required,
		type,
		value,
		valueIsUpdating,
		...rest
	} = props;

	if (type === 'hidden') {
		return <input id={id} type={type} value={value} />;
	}
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={label}
			labelAfter
			required={required}
			valueIsUpdating={valueIsUpdating}
		>
			<input
				id={id}
				className="form-control"
				disabled={disabled || valueIsUpdating}
				onBlur={event => onBlur(event, value)}
				onChange={event => onChange(event, convertValue(type, event.target.value))}
				type={type}
				value={value}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={required}
				aria-describedby={`${descriptionId} ${errorId}`}
				{...rest}
			/>
		</FieldTemplate>
	);
}

function ContextualInput({ schema = {}, ...props }) {
	const { onChange, onFinish, properties } = useContext(formContext);
	const innerSchema = schema.schema || {};
	return (
		<Input
			autoFocus={schema.autoFocus}
			description={schema.description}
			disabled={schema.disabled}
			label={schema.title}
			placeholder={schema.placeholder}
			readOnly={schema.readOnly}
			required={schema.required}
			type={schema.type}
			onChange={(event, value) => onChange(event, { schema, value })}
			onBlur={(event, value) => onFinish(event, { schema, value })}
			value={get(properties, schema.key) || ''}
			// number specific
			min={innerSchema.minimum}
			max={innerSchema.maximum}
			step={innerSchema.step}
			{...props}
		/>
	);
}
ContextualInput.propTypes = {
	schema: PropTypes.object,
};
export default ContextualInput;
