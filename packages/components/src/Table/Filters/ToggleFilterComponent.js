import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Toggle from '../../Toggle';

function getLabel(extra) {
	if (extra && extra.label) {
		return extra.label;
	}
	return '';
}

/**
 * Component used with a filter based on boolean value.
 * It displays a toggle button with a label.
 */
export default class ToggleFilterComponent extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		const active = this.props.filter.isActive();
		this.props.filter.setActive(!active);
		this.props.onFilterChange(this.props.filter);
	}

	render() {
		const { filter, extra, className } = this.props;
		return (
			<Toggle
				className={classNames('tc-boolean-filter', className)}
				onChange={this.onChange}
				label={getLabel(extra)}
				checked={filter.isActive()}
			/>
		);
	}
}

ToggleFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
	className: PropTypes.string,
	extra: PropTypes.shape({
		label: PropTypes.string,
	}),
};
