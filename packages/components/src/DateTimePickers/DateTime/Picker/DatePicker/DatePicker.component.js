import React, { useContext } from 'react';

import { DateTimeContext } from '../../Context';
import DateTimePicker from '../../../pickers/DateTimePicker';

export default function DatePicker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	return (
		<DateTimePicker
			manageFocus
			selection={{
				date: datetime.date,
				time: datetime.time,
			}}
			{...pickerManagement}
			{...props}
		/>
	);
}
DatePicker.displayName = 'DateTime.DatePicker';
