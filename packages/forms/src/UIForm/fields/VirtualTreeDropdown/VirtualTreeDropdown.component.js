import PropTypes from 'prop-types';
import React from 'react';
import VirtualTree from '@talend/react-components/lib/VirtualTree';
import keycode from 'keycode';
import FieldTemplate from '@talend/react-forms/lib/UIForm/fields/FieldTemplate';
import {
	generateDescriptionId,
	generateErrorId,
} from '@talend/react-forms/lib/UIForm/Message/generateId';
import callTrigger from '@talend/react-forms/lib/UIForm/trigger';

function isIn(element, container) {
	if (element.parentElement === null) {
		return false;
	}
	if (element.parentElement !== container) {
		return isIn(element.parentElement, container);
	}
	return true;
}

export default class VirtualTreeDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selected: props.value };
		// fields
		// this.onClearAll = this.onClearAll.bind(this);
		// dropdown
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
		// trigger
		this.onTrigger = this.onTrigger.bind(this);
		this.onTriggerResult = this.onTriggerResult.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.closeOnOutsideClick);
		this.onTrigger({ type: 'didMount' });
	}
	/*
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			// reset selected
			this.setState({ selected: nextProps.value });
		}
	}
*/
	componentWillUnmount() {
		document.removeEventListener('click', this.closeOnOutsideClick);
	}

	onInputKeyDown(event) {
		if (event.which === keycode.codes.esc) {
			event.preventDefault();
			this.setState({ showDropdown: false });
		}
	}

	onInputFocus(event) {
		this.setState({ showDropdown: true });
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	}

	onTrigger(event) {
		callTrigger(event, {
			eventNames: [event.type],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger: this.onTriggerResult,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		});
	}

	onTriggerResult(event, trigger) {
		return this.props.onTrigger(event, {
			trigger,
			schema: this.props.schema,
			errors: this.props.errors,
			properties: this.props.properties,
		});
	}

	onChange(event, selected) {
		const payload = {
			schema: this.props.schema,
			value: selected,
		};
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	getChildrenErrorMessage() {
		const { errors } = this.props.errors;
		if (!errors || errors.length === 0) {
			return undefined;
		}

		const key = this.props.schema.key.toString();
		return Object.entries(errors)
			.filter(entry => entry[0].startsWith(key))
			.map(entry => entry[1])
			.join(', ');
	}
	closeOnOutsideClick(event) {
		if (this.containerRef !== null && !isIn(event.target, this.containerRef)) {
			this.setState({ showDropdown: false, searchTerm: '' });
		}
	}

	render() {
		const { id, isValid, errorMessage, schema } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const errorMsg = errorMessage || this.getChildrenErrorMessage();
		const isDeepValid = isValid && !errorMsg;

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMsg}
				id={id}
				isValid={isDeepValid}
				label={schema.title}
				required={schema.required}
			>
				{this.state.showDropdown && (
					<div className={theme.dropdown} style={{ height: props.height }}>
					{props.isLoading ? (
						<div className={theme.loading}>
							<CircularProgress />
						</div>
					) :
					(<VirtualTree
						id={id}
						autoFocus={schema.autoFocus}
						disabled={schema.disabled}
						required={schema.required}
						placeholder={schema.placeholder}
						readOnly={schema.readOnly}
						onBlur={this.onTrigger}
						onChange={this.onChange}
						onFocus={this.onTrigger}
						nodes={this.props.value}
						isLoading={this.state.isLoading}
						selectAllButton
					/>)
					}
				)}
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	VirtualTreeDropdown.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		errors: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		onTrigger: PropTypes.func.isRequired,
		properties: PropTypes.object,
		//		resolveName: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			key: PropTypes.array,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			//			restricted: PropTypes.bool,
			//			title: PropTypes.string,
			//			titleMap: PropTypes.arrayOf(
			//				PropTypes.shape({
			//					name: PropTypes.string.isRequired,
			//					value: PropTypes.string.isRequired,
			//				}),
			//			),
			triggers: PropTypes.arrayOf(
				PropTypes.shape({
					onEvent: PropTypes.string,
				}),
			),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

VirtualTreeDropdown.defaultProps = {
	isValid: true,
	schema: {},
	value: [],
	resolveName: value => value,
};
