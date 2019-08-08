import React from 'react';
import { mount } from 'enzyme';

import { DateTimeContext } from '../../Context';
import DatePicker from './DatePicker.component';

describe('DateTime.DatePicker', () => {
	it('should render', () => {
		// given
		const managerValue = {
			errorManagement: {
				hoursErrorId: 'hoursErrorId',
				minutesErrorId: 'minutesErrorId',
				secondsErrorId: 'secondsErrorId',
				onInputFocus: jest.fn(),
				hasError: () => false,
			},
			datetime: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			pickerManagement: {
				onSubmit: jest.fn(),
				useTime: true,
				useSeconds: true,
				useUTC: false,
			},
		};

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<DatePicker other="custom props" />
			</DateTimeContext.Provider>,
		);

		// then
		expect(wrapper.find('DateTimePicker').props()).toEqual({
			manageFocus: true,
			onSubmit: managerValue.pickerManagement.onSubmit,
			other: 'custom props',
			selection: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			useSeconds: true,
			useTime: true,
			useUTC: false,
		});
	});

	it('should call manager onSubmit callback on picker submission', () => {
		// given
		const managerValue = {
			errorManagement: {
				hoursErrorId: 'hoursErrorId',
				minutesErrorId: 'minutesErrorId',
				secondsErrorId: 'secondsErrorId',
				onInputFocus: jest.fn(),
				hasError: () => false,
			},
			datetime: {
				date: new Date(2007, 0, 2),
				time: { hours: '01', minutes: '02', seconds: '03' },
			},
			pickerManagement: {
				onSubmit: jest.fn(),
			},
		};

		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<DatePicker />
			</DateTimeContext.Provider>,
		);
		expect(managerValue.pickerManagement.onSubmit).not.toBeCalled();

		// when
		wrapper.find('DateTimePicker').prop('onSubmit')();

		// then
		expect(managerValue.pickerManagement.onSubmit).toBeCalled();
	});
});
