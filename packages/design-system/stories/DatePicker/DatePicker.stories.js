/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { TimePicker } from '@talend/react-components/lib/DateTimePickers/pickers/TimePicker/TimePicker.component';
import DateManager from '@talend/react-components/lib/DateTimePickers/Date/Manager';
import DatePicker from '@talend/react-components/lib/DateTimePickers/Date/Picker';
import InputDateTimePicker from '@talend/react-components/lib/DateTimePickers/InputDateTimePicker';
import InputTimePicker from '@talend/react-components/lib/DateTimePickers/InputTimePicker';
import InputDatePicker from '@talend/react-components/lib/DateTimePickers/InputDatePicker';

storiesOf('Components|Date Picker/Date', module)
	.addParameters({ component: InputDatePicker })
	.addDecorator(storyFn => (
		<div>
			<IconsProvider />
			<form>{storyFn()}</form>
		</div>
	))
	.add('Input', () => (
		<InputDatePicker
			id="my-date-picker"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
			name="datetime"
		/>
	))
	.add('Picker', () => (
		<div style={{ border: '1px solid black', marginRight: '1rem' }}>
			<DateManager id="simple" onChange={action('onChange')}>
				<DatePicker />
			</DateManager>
		</div>
	))
	.add('UTC (deprecated, use timezone)', () => (
		<InputDatePicker
			id="my-date-picker"
			name="Datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
			useUTC
		/>
	))
	.add('Timezone', () => (
		<InputDatePicker
			id="my-date-picker"
			name="Datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={1569340800000}
			timezone="Europe/Berlin"
		/>
	))
	.add('Custom format', () => (
		<InputDatePicker
			id="my-date-picker"
			name="Datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={new Date(2018, 4, 13, 12, 30)}
			dateFormat="DD/MM/YYYY"
		/>
	));

const timeContainerStyle = {
	overflow: 'scroll',
	width: '7rem',
	height: '17rem',
	boxShadow: '0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.2)',
	marginRight: 60,
};
storiesOf('Components|Date Picker/Time', module)
	.addParameters({ component: InputTimePicker })
	.addDecorator(storyFn => (
		<div>
			<IconsProvider />
			<form>{storyFn()}</form>
		</div>
	))
	.add('Input', () => <InputTimePicker onChange={action('onChange')} onBlur={action('onBlur')} />)
	.add('Picker', () => <TimePicker style={timeContainerStyle} onSubmit={action('onSubmit')} />)
	.add('Timezone', () => (
		<InputTimePicker onChange={action('onChange')} value="12:00" timezone="Europe/Berlin" />
	))
	.add('Seconds', () => <InputTimePicker onChange={action('onChange')} useSeconds />)
	.add('Custom interval', () => <InputTimePicker onChange={action('onChange')} interval={120} />);

storiesOf('Components|Date Picker/DateTime', module)
	.addParameters({ component: InputDateTimePicker })
	.addDecorator(storyFn => (
		<div>
			<IconsProvider />
			<form>{storyFn()}</form>
		</div>
	))
	.add('Input', () => (
		<InputDateTimePicker
			id="my-date-picker"
			name="Datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={new Date(2018, 4, 13, 12, 30, 44)}
		/>
	))
	.add('UTC (deprecated, use timezone)', () => (
		<InputDateTimePicker
			id="my-datetime-picker"
			name="Datetime"
			onChange={action('onChange')}
			value={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
			useUTC
		/>
	))
	.add('Timezone', () => (
		<InputDateTimePicker
			id="my-datetime-picker"
			name="Datetime"
			onChange={action('onChange')}
			value={1569340800000}
			timezone="America/New_York"
		/>
	));
