import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateRangeContext } from '../Context';
import {
	extractParts,
	extractRangePartsFromTextInput,
	extractRangePartsFromDate,
} from '../date-range-extraction';

function ContextualManager(props) {
	function getOptions() {
		return {
			dateFormat: props.dateFormat,
		};
	}
	const initialState = extractParts(props.startDate, props.endDate, getOptions());
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.startDate !== state.startDate || props.endDate !== state.endDate) {
			const parts = extractParts(props.startDate, props.endDate, getOptions());
			setState(parts);
		}
	}, [props.startDate, props.endDate]);

	function onDatesChange(event, nextState) {
		if (props.onChange) {
			const payload = {
				startDate: nextState.startDate,
				endDate: nextState.endDate,
				errors: nextState.errors,
				errorMessage: nextState.errorMessage,
				field: state.focusedInput,
				origin: 'RANGE_PICKER',
			};
			props.onChange(event, payload);
		}
	}

	function onFocusChange(event, focusedInput) {
		setState(prevState => ({
			...prevState,
			focusedInput,
		}));
	}

	function onSelectDate(event, { date }) {
		const dateParts = extractRangePartsFromDate(date, state, getOptions());
		const nextState = {
			...state,
			...dateParts,
		};
		setState(prevState => ({ ...prevState, ...dateParts }));
		onDatesChange(event, nextState);
	}

	function onInputChange(event) {
		const textInput = event.target.value;
		const parts = extractRangePartsFromTextInput(textInput, state.focusedInput, getOptions());
		const nextState = { ...state, ...parts };
		setState(nextState);
		onDatesChange(event, nextState);
	}

	return (
		<DateRangeContext.Provider
			value={{
				startDate: {
					value: state.startDate,
					textInput: state.startDateTextInput,
				},
				endDate: {
					value: state.endDate,
					textInput: state.endDateTextInput,
				},
				inputManagement: {
					onChange: onInputChange,
					onFocus: onFocusChange,
					focusedInput: state.focusedInput,
					placeholder: props.dateFormat,
				},
				pickerManagement: {
					onSubmit: onSelectDate,
				},
			}}
		>
			{props.children}
		</DateRangeContext.Provider>
	);
}
ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
};
ContextualManager.displayName = 'DateRange.Manager';
ContextualManager.propTypes = {
	children: PropTypes.element,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	dateFormat: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default ContextualManager;
