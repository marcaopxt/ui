import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Actions } from '../../Actions';
import ItemTitle from '../ItemTitle';

import DisplayPropTypes from '../Display/Display.propTypes';

import theme from './DisplayTable.scss';

function RowRenderer(props) {
	const { id, item, itemProps, titleProps } = props;
	const { classNameKey, onToggle, isSelected, selectedClass } = itemProps || {};
	const checkboxColumn = onToggle && isSelected ?
		(<td>
			<input
				id={id && `${id}-check`}
				type="checkbox"
				onChange={(e) => { onToggle(e, item); }}
				checked={isSelected(item)}
			/>
		</td>) :
		null;
	const classes = classnames(
		classNameKey && item[classNameKey],
		isSelected && isSelected(item) && (selectedClass || 'active')
	);
	return (
		<tr id={id} className={classes}>
			{checkboxColumn}
			{props.columns.map((column, index) => {
				const isTitle = column.key === titleProps.key;
				const cell = isTitle ?
					(<ItemTitle
						id={id && `${id}-title`}
						item={item}
						titleProps={titleProps}
					/>) :
					item[column.key];

				// actions are only on title and on 'text' display mode
				const { displayModeKey } = titleProps;
				const displayActions =
					isTitle &&
					(!displayModeKey || !item[displayModeKey] || item[displayModeKey] === 'text');
				const actions = displayActions ?
					(<Actions
						actions={item.actions || []}
						hideLabel
						link
					/>) :
					null;

				return (
					<td key={index}>
						{cell}
						{actions}
					</td>
				);
			})}
		</tr>
	);
}
RowRenderer.propTypes = {
	id: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	columns: PropTypes.arrayOf(
		PropTypes.shape({ key: PropTypes.string.isRequired })
	).isRequired,
	itemProps: DisplayPropTypes.itemProps,
	titleProps: ItemTitle.propTypes.titleProps,
};

function ListHeader(props) {
	const {
		columns,
		items,
		isSelected,
		onToggleAll,
	} = props;
	const isAllSelected = () => {
		const selected = items.reduce((sum, item) => {
			if (isSelected(item)) {
				return sum + 1;
			}
			return sum;
		}, 0);
		return items.length > 0 && selected === items.length;
	};
	const checkbox = onToggleAll && isSelected ?
		(<th>
			<input
				id={props.id && `${props.id}-check-all`}
				type="checkbox"
				onChange={(e) => { onToggleAll(e, items); }}
				checked={isAllSelected()}
				disabled={items.length === 0}
			/>
		</th>) :
		null;
	return (
		<tr>
			{checkbox}
			{columns.map((column, index) => (<th key={index}>{column.label}</th>))}
		</tr>
	);
}
ListHeader.propTypes = {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string })
	),
	items: PropTypes.arrayOf(PropTypes.object),
	isSelected: PropTypes.func,
	onToggleAll: PropTypes.func,
};

/**
 * @param {array} columns the array of column definitions
 * @param {array} items the array of items to display
 * @param {object} titleProps the title configuration props
 * @example
 const props = {
	items: [
		{
			id: 1,
			name: 'Title with actions',
			created: '2016-09-22',
			modified: '2016-09-22',
			author: 'Jean-Pierre DUPONT',
			actions: [{
				label: 'edit',
				icon: 'fa fa-edit',
				onClick: action('onEdit'),
			}],
			icon: 'fa fa-file-excel-o',
			display: 'text',
		},
		{
			id: 2,
			name: 'Title in input mode',
			created: '2016-09-22',
			modified: '2016-09-22',
			author: 'Jean-Pierre DUPONT',
			icon: 'fa fa-file-pdf-o',
			display: 'input',
		},
	],
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'name', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleProps: {
		key: 'name',
		iconKey: 'icon',
		displayModeKey: 'display',
		onClick: action('onClick'),
		onEditCancel: action('onEditCancel'),
		onEditValidate: action('onEditValidate'),
	},
};
<DisplayTable {...props} />
 */
function DisplayTable(props) {
	const {
		id,
		columns,
		items,
		itemProps,
		titleProps,
	} = props;
	const { isSelected, onToggleAll } = itemProps || {};
	const className = classnames(
		'table',
		'tc-list-display-table',
		theme.table,
	);
	return (
		<table className={className} >
			<thead>
				<ListHeader
					columns={columns}
					onToggleAll={onToggleAll}
					items={items}
					isSelected={isSelected}
					id={id}
				/>
			</thead>
			<tbody>
				{items.map(
					(item, index) => (
						<RowRenderer
							id={id && `${id}-${index}`}
							key={index}
							columns={columns}
							item={item}
							itemProps={itemProps}
							titleProps={titleProps}
						/>
					)
				)}
			</tbody>
		</table>
	);
}

DisplayTable.propTypes = DisplayPropTypes;

DisplayTable.defaultProps = {
	items: [],
	titleProps: { key: 'name' },
};

export default DisplayTable;
