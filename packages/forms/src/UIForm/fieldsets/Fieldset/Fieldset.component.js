import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Action } from '@talend/react-components/lib/Actions';
import Widget from '../../Widget';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items, options } = schema;
	const fieldsetClasses = classnames('form-group', { 'has-error': !props.isValid });
	const [toggle, setToggle] = React.useState(!!props.value);
	const onToggle = e => {
		props.onChange(e, { schema, value: toggle ? undefined : {} });
		props.onFinish(e, { schema, value: toggle ? undefined : {} });
		setToggle(!toggle);
	};
	return (
		<fieldset className={fieldsetClasses}>
			<legend
				className={classnames({
					'sr-only': options && options.hideTitle,
					required: schema.required,
				})}
			>
				{title}
				{schema.key && !schema.required && (
					<Action icon={toggle ? 'talend-trash' : 'talend-plus'} label="check" onClick={onToggle} hideLabel bsStyle="link" />
				)}
			</legend>
			{items.map((itemSchema, index) => (
				<Widget {...restProps} key={index} schema={itemSchema} />
			))}
		</fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Fieldset.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string.isRequired,
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}
