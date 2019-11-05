import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import IconsProvider from '@talend/react-components/lib/IconsProvider';
// import { TimePicker } from '@talend/react-components/lib/DateTimePickers/pickers/TimePicker/TimePicker.component';
import DateManager from '@talend/react-components/lib/DateTimePickers/Date/Manager';
import DatePicker from '@talend/react-components/lib/DateTimePickers/Date/Picker';
import InputDateTimePicker from '@talend/react-components/lib/DateTimePickers/InputDateTimePicker';
// import InputTimePicker from '@talend/react-components/lib/DateTimePickers/InputTimePicker';
import InputDatePicker from '@talend/react-components/lib/DateTimePickers/InputDatePicker';

storiesOf('DatePicker', module)
	.addParameters({ component: InputDatePicker })
	.addDecorator(storyFn => (
		<div>
			<IconsProvider />
			<form style={{ display: 'flex', justifyContent: 'center' }}>{storyFn()}</form>
		</div>
	))
	.add('Date picker', () => (
		<InputDatePicker
			id="my-date-picker"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
			name="datetime"
		/>
	))
	/*
	.add('Date picker - UTC', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker in UTC TZ</h1>
			<p>You can require to work with only UTC dates (input and output).</p>
			<pre>{`
<InputDatePicker
	id="my-date-picker"
	...
	useUTC
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDatePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					value={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
					useUTC
				/>
			</form>
		</div>
	))
	.add('Date picker - timezone', () => (
		<div>
			<IconsProvider />
			<h1>DatePicker with timezone</h1>
			<p>You can require to work with timezone (input and output).</p>
			<pre>{`
<InputDatePicker
	id="my-date-picker"
	...
	timezone="Europe/Berlin"
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDatePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					value={1569340800000}
					timezone="Europe/Berlin"
				/>
			</form>
		</div>
	))
	.add('Date picker - custom format', () => (
		<div>
			<h1>DatePicker with custom format</h1>
			<p>
				Date picker can accept a custom date format if it's a composition of DD, MM, YYYY only.
				<br />
				Once date-fns parse() accept a format (scheduled for 2.0), we can remove this specific code
				and accept any format.
				<br />
				<br />
				Here we set date format to: DD/MM/YYYY. (default is YYYY-MM-DD)
			</p>
			<pre>{`
<InputDatePicker
	id="my-date-picker"
	...
	dateFormat="DD/MM/YYYY"
/>
			`}</pre>
			<IconsProvider />
			<form style={{ width: 320 }}>
				<InputDatePicker
					id="my-date-picker"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					value={new Date(2018, 4, 13, 12, 30)}
					dateFormat="DD/MM/YYYY"
				/>
			</form>
		</div>
	))*/
	.add('Date picker - no input', () => (
		<div style={{ border: '1px solid black', marginRight: '1rem' }}>
			<DateManager id="simple" onChange={action('onChange')}>
				<DatePicker />
			</DateManager>
		</div>
	)) /*
	.add('Date picker - parent with fixed height', () => {
		const width = 150;
		return (
			<div>
				<IconsProvider />
				<h1>DatePicker with fixed-height parent</h1>
				<div style={{ height: 300, overflow: 'auto', border: 'solid' }}>
					<form style={{ width, float: 'left' }}>
						<InputDatePicker
							id="my-date-picker-top-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDatePicker
							id="my-date-picker-top-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<div style={{ height: 600 }} />
					<form style={{ width, float: 'left' }}>
						<InputDatePicker
							id="my-date-picker-bottom-left"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
					<form style={{ width, float: 'right' }}>
						<InputDatePicker
							id="my-date-picker-bottom-right"
							name="Datetime"
							onBlur={action('onBlur')}
							onChange={action('onChange')}
						/>
					</form>
				</div>
			</div>
		);
	})
	.add('Time picker - no input', () => {
		const containerStyle = {
			overflow: 'scroll',
			width: '7rem',
			height: '17rem',
			boxShadow: '0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.2)',
			marginRight: 60,
		};
		const onSubmit = action('onSubmit');
		return (
			<div>
				<h1>TimePicker without input</h1>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div>
						<p>default range</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} />
						</div>
					</div>
					<div>
						<p>range 120 minutes</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} interval={120} />
						</div>
					</div>
					<div>
						<p>use secconds</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} useSeconds />
						</div>
					</div>
					<div>
						<p>with textInput</p>
						<div style={containerStyle}>
							<TimePicker onSubmit={onSubmit} textInput="20:00" />
						</div>
					</div>
				</div>
			</div>
		);
	})
	.add('Time picker - with input', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<h1>TimePicker with input</h1>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<div style={{ width: '16rem', marginRight: 60 }}>
					<p>with input</p>
					<form>
						<InputTimePicker onChange={action('onChange')} onBlur={action('onBlur')} />
					</form>
				</div>
				<div style={{ width: '16rem', marginRight: 60 }}>
					<p>with initial selectedTime</p>
					<form>
						<InputTimePicker
							onChange={action('onChange')}
							onBlur={action('onBlur')}
							value="12:00"
						/>
					</form>
				</div>
				<div style={{ width: '16rem' }}>
					<p>with timezone info</p>
					<form>
						<InputTimePicker onChange={action('onChange')} value="12:00" timezone="Europe/Berlin" />
					</form>
				</div>
			</div>
		</div>
	))*/
	.add('DateTime picker', () => (
		<InputDateTimePicker
			id="my-date-picker"
			name="Datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={new Date(2018, 4, 13, 12, 30, 44)}
		/>
	)); /*
	.add('DateTime picker - UTC', () => (
		<div>
			<IconsProvider />
			<h1>DateTimePicker in UTC TZ</h1>
			<p>You can require to work with only UTC datetime (input and output).</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	useUTC
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-datetime-picker"
					name="Datetime"
					onChange={action('onChange')}
					value={new Date(Date.UTC(2018, 4, 13, 12, 30, 44))}
					useUTC
				/>
			</form>
		</div>
	))
	.add('DateTime picker - timezone', () => (
		<div>
			<IconsProvider />
			<h1>DateTimePicker with custom timezone</h1>
			<p>You can require to work with specific timezone (input and output).</p>
			<p>String format</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	value={'2019-09-25 09:02'}
	timezone="Europe/Berlin"
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-datetime-picker"
					name="Datetime"
					onChange={action('onChange')}
					value="2019-09-25 09:02"
					timezone="Europe/Berlin"
				/>
			</form>
			<p>Unix time format</p>
			<pre>{`
<InputDateTimePicker
	id="my-date-picker"
	...
	value={1569340800000}
	timezone="America/New_York"
/>
			`}</pre>
			<form style={{ width: 320 }}>
				<InputDateTimePicker
					id="my-datetime-picker"
					name="Datetime"
					onChange={action('onChange')}
					value={1569340800000}
					timezone="America/New_York"
				/>
			</form>
		</div>
	))
	.add('Date Range picker - no input', () => {
		const blockStyle = { border: '1px solid black', marginRight: '1rem' };
		return (
			<div>
				<IconsProvider />
				<h1>DateRangePicker without input</h1>
				<p>DatePicker can display range of date</p>
				<pre>{`
<DatePicker
	selectedDate={new Date(2019, 9, 24)}
	endDate={new Date(2019, 9, 30)}
/>
			`}</pre>
				<div style={{ display: 'flex', alignItems: 'flex-start' }}>
					<div style={blockStyle}>
						<DateManager id="simple" onChange={action('onChange')}>
							<DatePicker selectedDate={new Date(2019, 9, 24)} endDate={new Date(2019, 9, 30)} />
						</DateManager>
					</div>
				</div>
			</div>
		);
	});*/
