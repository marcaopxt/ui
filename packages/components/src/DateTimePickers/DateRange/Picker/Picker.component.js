import React, { useContext } from 'react';
import omit from 'lodash/omit';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE, START_TIME, END_TIME } from '../constants';
import CalendarPicker from '../../pickers/CalendarPicker';
import TimePicker from '../../pickers/TimePicker';

const PROPS_TO_OMIT = ['startDate', 'endDate'];

export default function Picker(props) {
	const { startDate, endDate, pickerManagement, startTime, endTime } = useContext(DateRangeContext);
	const { onStartChange, onEndChange, onTimeChange } = pickerManagement;
	return [
		props.focusedInput === START_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={startDate.value}
				endDate={endDate.value}
				onSubmit={onStartChange}
				{...omit(props, PROPS_TO_OMIT)}
			/>
		),
		props.focusedInput === END_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={endDate.value}
				startDate={startDate.value}
				onSubmit={onEndChange}
				{...omit(props, PROPS_TO_OMIT)}
			/>
		),
		props.focusedInput === START_TIME && (
			<TimePicker
				textInput={startTime.textInput}
				useSeconds={props.useSeconds}
				onChange={(...args) => onTimeChange(...args, START_TIME, 'START_TIME_PICKER')}
			/>
		),
		props.focusedInput === END_TIME && (
			<TimePicker
				textInput={endTime.textInput}
				useSeconds={props.useSeconds}
				onChange={(...args) => onTimeChange(...args, END_TIME, 'END_TIME_PICKER')}
			/>
		),
	].filter(Boolean);
}
Picker.displayName = 'DateRange.Picker';
