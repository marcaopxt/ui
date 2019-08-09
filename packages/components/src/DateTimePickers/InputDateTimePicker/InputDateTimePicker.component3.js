import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import DateTime from '../DateTime';
import TimePicker from '../DateTime/Picker/TimePicker';
import createInputPicker, { INPUT_PICKER_PROPTYPES } from './utils';

import theme from './InputDateTimePicker.scss';

class InputDateTimePicker extends React.Component {
	static propTypes = {
		...INPUT_PICKER_PROPTYPES,
		selectedDateTime: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.number,
			PropTypes.string,
		]),
		dateFormat: PropTypes.string,
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
		useUTC: PropTypes.bool,
		required: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
		useUTC: false,
		formMode: false,
		// default behaviour is to forbid empty values
		required: true,
	};

	constructor(props) {
		super(props);

		this.popoverId = `date-time-picker-${props.id || uuid.v4()}`;
		this.onChange = this.onChange.bind(this);
	}

	onChange(event, payload) {
		this.props.onChange(event, payload);
		if (
			this.props.formMode ||
			(!this.props.formMode && !this.props.useTime && payload.origin !== 'INPUT')
		) {
			// this.inputRef.focus();
			// this.closePicker({ picked: true });
		}
	}
	render() {
		const dateInputProps = {
			part: 'date',
			theme,
			Picker: DateTime.DatePicker,

		};
		const timeInputProps = {
			part: 'time',
			theme,
			Picker: TimePicker,

		};
		const InputDatePicker = createInputPicker(dateInputProps);
		const InputTimePicker = createInputPicker(timeInputProps);
		return (
			<DateTime.Manager
				dateFormat={this.props.dateFormat}
				formMode={this.props.formMode}
				id={this.props.id}
				required={this.props.required}
				selectedDateTime={this.props.selectedDateTime}
				useSeconds={this.props.useSeconds}
				useTime={this.props.useTime}
				useUTC={this.props.useUTC}
				onChange={this.onChange}
			>
				<InputDatePicker {...this.props} />
				{this.props.useTime && <InputTimePicker {...this.props} />}
			</DateTime.Manager>
		);
	}
}
export default InputDateTimePicker;
