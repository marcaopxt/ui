import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

import { DateTimeContext } from '../Context';

export default function Input(props) {
	const { datetime, inputManagement, errorManagement } = useContext(DateTimeContext);
	const textInput = props.type === 'date' ? datetime.dateTextInput : datetime.timeTextInput;
	return (
		<DebounceInput
			aria-describedby={errorManagement.inputErrorId}
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			onFocus={errorManagement.onInputFocus}
			value={textInput}
			{...inputManagement}
			{...props}
			type="text"
		/>
	);
}
Input.propTypes = {
	type: PropTypes.oneOf(['date', 'time']).isRequired,
};

Input.displayName = 'DateTime.Input';
