import React from 'react';
import { Popper } from 'react-popper';
import FocusManager from '../FocusManager';


class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.setRef = this.setRef.bind(this);
		this.dropdown = React.createRef();
		// this.inputRef = React.createRef();
		this.options = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
		this.state = {
			open: false,
			value: '',
		};
	}
	onFocus() {
		this.setState({ open: true });
	}
	onBlur() {
		// this.setState({ open: false });
	}
	onSelect(e, option, index) {
		this.setState({
			value: option,
		});
		this.setState(prevState => ({ open: false }));
	}
	onInput(event) {
		const firstMatch = this.options.findIndex(option => option.includes(event.target.value));
		if (firstMatch > 0) {
			this.dropdown.current.childNodes[firstMatch].scrollIntoView();
		}
		this.setState({
			value: event.target.value
		})
	}
	getPopperPlacement() {
		const input = this.inputRef;
		if (input) {
			const inputDimensions = input.current.getBoundingClientRect();
			if (inputDimensions.left > window.innerWidth / 2) {
				return 'bottom-end';
			}
		}
		return 'bottom-start';
	}
	generateOptions() {
		return ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
	}
	setRef(ref) {
		this.inputRef = ref;
	}
	render() {
		return (
			<form style={{ position: 'relative' }}>
				<FocusManager
					onFocusOut={this.onBlur}
					onFocusIn={this.onFocus}
				>
					<input type="text" ref={ref => this.inputRef = ref} onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.value} onChange={this.onInput} />
					{this.state.open && (
						<Popper
							key="popper"
							// modifiers={{
							// 	hide: {
							// 		enabled: false,
							// 	},
							// 	preventOverflow: {
							// 		enabled: false,
							// 	},
							// }}
							placement='bottom-start'
							// positionFixed={true}
							referenceElement={this.inputRef}
						>
							{({ style, ref }) => {
								return (<div style={style}> ref={ref}
									hello world
									{/* <ul
										ref={this.dropdown}
										style={{
											// position: 'absolute',
											// top: 20,
											height: '17rem',
											width: '7rem',
											border: 'solid',
											borderColor: 'black',
											listStyle: 'none',
											paddingInlineStart: '20px',
											overflowY: 'auto',
										}}
									>
										{this.options.map((option, index) => (<li id={`time-option-${index}`} key={index} onClick={e => this.onSelect(e, option, index)}>{option}</li>))}
									</ul> */}
								</div>)
							}}
						</Popper>
					)}
				</FocusManager>
			</form>
		);
	}
}

export default TimePicker;
