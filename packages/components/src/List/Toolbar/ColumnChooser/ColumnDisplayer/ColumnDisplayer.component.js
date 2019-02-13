import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';

import ActionButton from '../../../../Actions/ActionButton';
import theme from './ColumnDisplayer.scss';

const ColumnVisibility = ({ onChange, locked, value }) => {
	if (locked) {
		return <Icon name="talend-locked" />;
	}
	return (
		<input
			className={classNames(
				theme['tc-column-displayer-visibility-checkbox'],
				'tc-column-displayer-visibility-checkbox',
			)}
			onChange={() => onChange(!value)}
			type="checkbox"
			checked={value}
			value={value}
		/>
	);
};

ColumnVisibility.propTypes = {
	onChange: PropTypes.func.isRequired,
	locked: PropTypes.bool,
	value: PropTypes.bool,
};

const OrderDisplay = ({ order, length }) => (
	<React.Fragment>
		<span
			className={classNames(
				theme['tc-column-displayer-order-value'],
				'tc-column-displayer-order-value',
			)}
		>
			{order}
		</span>
		{`/ ${length}`}
	</React.Fragment>
);

OrderDisplay.propTypes = {
	order: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
};

const ColumnOrder = ({ length, order, locked, onBlur, onChange, onKeyPress, value }) => {
	const [editMode, setEditMode] = useState(false);
	function changeEditMode(fn, event) {
		if (fn(event, event.target.value)) {
			setEditMode(!editMode);
		}
	}
	if (locked || !editMode) {
		return (
			<ActionButton
				disabled={locked}
				link
				onClick={() => setEditMode(!editMode)}
				label={<OrderDisplay order={order} length={length} />}
			/>
		);
	}
	return (
		<React.Fragment>
			<input
				className={classNames(
					theme['tc-column-displayer-order-input-text'],
					'tc-column-displayer-order-input-text',
				)}
				onBlur={event => {
					changeEditMode(onBlur, event);
				}}
				onChange={event => onChange(event.target.value)}
				onKeyPress={event => changeEditMode(onKeyPress, event)}
				placeholder={value}
				type="text"
				value={value}
			/>
			{`/ ${length}`}
		</React.Fragment>
	);
};

ColumnOrder.propTypes = {
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

const ColumnDisplayer = ({
	label,
	hidden,
	locked,
	order,
	length,
	onChangeVisibility,
	onChangeOrder,
	onBlurOrder,
	onKeyPressOrder,
	isDragging,
}) => {
	return (
		<div
			id="column-chooser-displayer"
			key={`${label}`}
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
		>
			{isDragging && (
				<div
					className={classNames(
						theme['tc-column-displayer-dragging'],
						'tc-column-displayer-dragging',
					)}
				/>
			)}
			<div
				className={classNames(
					theme['tc-column-displayer-visibility'],
					'tc-column-displayer-visibility',
				)}
			>
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} locked={locked} />
			</div>
			<div className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
				{label}
			</div>
			<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
				<ColumnOrder
					length={length}
					locked={locked}
					onBlur={onBlurOrder}
					onChange={onChangeOrder}
					onKeyPress={onKeyPressOrder}
					order={order}
					value={order}
				/>
			</div>
		</div>
	);
};

ColumnDisplayer.propTypes = {
	hidden: PropTypes.bool,
	isDragging: PropTypes.bool,
	label: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
};

export default ColumnDisplayer;
