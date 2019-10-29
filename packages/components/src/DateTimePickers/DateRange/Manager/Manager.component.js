import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import { DateRangeContext } from '../Context';
import { extractParts, extractPartsFromTextInputRange } from '../date-range-extraction';
import { extractFromDate } from '../../Date/date-extraction';
import { START_DATE, END_DATE } from '../constants';

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
			props.onChange(event, payload, nextState.focusedInput);
		}
	}

	function onFocusChange(event, focusedInput) {
		setState({
			...state,
			focusedInput,
		});
	}

	function onSelectDate(event, { date }) {
		const parts = extractFromDate(date, getOptions());
		const dateParts = {};
		if (state.focusedInput === START_DATE) {
			if (state.endDate && isAfter(parts.date, state.endDate)) {
				dateParts.endDate = undefined;
				dateParts.endDateTextInput = '';
			}
			dateParts.startDate = parts.date;
			dateParts.startDateTextInput = parts.textInput;
			dateParts.focusedInput = END_DATE;
		} else if (state.focusedInput === END_DATE) {
			if (state.startDate && isBefore(parts.date, state.startDate)) {
				dateParts.startDate = parts.date;
				dateParts.startDateTextInput = parts.textInput;
			} else {
				dateParts.endDate = parts.date;
				dateParts.endDateTextInput = parts.textInput;
				dateParts.focusedInput = state.startDate ? null : START_DATE;
			}
		}
		const nextState = {
			...state,
			...dateParts,
			errors: parts.errors,
			errorMessage: parts.errorMessage,
		};
		setState(nextState);
		onDatesChange(event, nextState);
	}

	function onInputChange(event) {
		const textInput = event.target.value;
		const parts = extractPartsFromTextInputRange(textInput, state.focusedInput, getOptions());
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
	onChange: PropTypes.func.isRequired,
};

export default ContextualManager;
