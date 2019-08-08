import React, { useContext } from 'react';
import { DateTimeContext } from '../../Context';
import TimePicker from '../../../pickers/TimePicker';

export default function ContextualTimePicker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	return (
		<TimePicker
			manageFocus
			selection={{
				time: datetime.time,
			}}
			{...pickerManagement}
			{...props}
		/>
	);
}
ContextualTimePicker.displayName = 'DateTime.TimePicker';
