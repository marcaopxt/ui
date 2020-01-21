/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Items from './Items.component';
import ItemsTemplate from './templates/ItemsTemplate.component';
import AddButton from './buttons/AddButton.component';
import DeleteButton from './buttons/DeleteButton.component';
import MoveUpButton from './buttons/MoveUpButton.component';
import MoveDownButton from './buttons/MoveDownButton.component';

import FieldsetTemplate from '../../templates/FieldsetTemplate';

import ArrayContext from './context';

export default function ArrayFieldset(props) {
	const { children, initialNbItems = 0, name, rhf, rules, ...restProps } = props;
	const { errors, getValues, setValue, register, unregister } = rhf;
	const lengthName = `${name}.length`;

	const [nbItems, setNbItems] = useState(() => {
		const items = getValues({ nest: true })[name];
		return items ? items.length : initialNbItems;
	});

	const hasRules = !!rules;

	// when we have rules, we register the array length to be able to
	// trigger validation on array length change
	// but when there is no element in the array, RHF builds an object instead of an empty array
	// because of array.length
	// to avoid that, when there are rules and no item in the array,
	// we register the array, with [] as value
	//
	// when we add an element, we deregister it to let RHF take over the array management again
	// when there is no rule, we don't register anything, we let RHF manage the array elements
	React.useEffect(() => {
		if (!hasRules || nbItems) {
			return;
		}
		console.log(`register({ name: ${name}, value: [] });`);
		register({ name, value: [] });
		return () => {
			console.log(`unregister(${name})`);
			unregister(name);
		};
	}, [hasRules, nbItems, name]);

	// when there are rules, we register the array to enable the array validation based on its length
	React.useEffect(() => {
		if (!hasRules) {
			return;
		}
		console.log(`register({ name: ${lengthName}, type: 'custom', value: ${nbItems} }, rules);`);
		register({ name: lengthName, type: 'custom', value: nbItems }, rules);
		setValue(lengthName, nbItems, true);
		return () => {
			console.log(`unregister(${lengthName})`);
			unregister(lengthName);
		};
	}, [hasRules]);

	// if we registered the array in RHF, on element add/remove,
	// we update the length to trigger validation
	React.useEffect(() => {
		if (!hasRules) {
			return;
		}
		console.log(`setValue(${lengthName}, ${nbItems}, true);`);
		setValue(lengthName, nbItems, true);
	}, [hasRules, lengthName, nbItems]);

	const getItems = () => {
		const items = getValues({ nest: true })[name];
		return items ? [...items] : [];
	};

	function refreshItems(newItems, fromIndex, toIndex /* excluded */) {
		if (fromIndex === undefined || toIndex === undefined || fromIndex >= toIndex) {
			return;
		}
		const values = getValues();
		// eslint-disable-next-line no-plusplus
		for (let i = fromIndex; i < toIndex; i++) {
			// support dot-notation (users.0) and bracket-notation (users[0])
			const indexBracket = `\\[${i}\\]`;
			const indexDot = `\\.${i}`;
			const itemKeyPattern = `^${name}(${indexBracket}|${indexDot})(\\.(.+))?$`;

			Object.keys(values)
				.map(key => key.match(itemKeyPattern))
				.filter(Boolean)
				.forEach(matchGroup => {
					const path = `[${i}]${matchGroup[2] || ''}`;
					setValue(matchGroup.input, get(newItems, path), true);
				});
		}
	}

	function addItem() {
		setNbItems(nbItems + 1);
	}

	function deleteItem(index) {
		const newItems = getItems();
		newItems.splice(index, 1);
		refreshItems(newItems, index, nbItems);
		setNbItems(nbItems - 1);
	}

	function swapItems(lowIndex, highIndex) {
		const newItems = getItems();
		[newItems[lowIndex], newItems[highIndex]] = [newItems[highIndex], newItems[lowIndex]];

		refreshItems(newItems, lowIndex, highIndex + 1);
	}

	function moveItemDown(index) {
		if (index === nbItems - 1) {
			return;
		}
		swapItems(index, index + 1);
	}

	function moveItemUp(index) {
		if (index === 0) {
			return;
		}
		swapItems(index - 1, index);
	}

	return (
		<ArrayContext.Provider value={{ nbItems, addItem, deleteItem, moveItemDown, moveItemUp }}>
			<FieldsetTemplate {...restProps} defaultValue={[]} error={get(errors, lengthName)}>
				{children}
			</FieldsetTemplate>
		</ArrayContext.Provider>
	);
}
ArrayFieldset.Items = Items;
ArrayFieldset.ItemsTemplate = ItemsTemplate;
ArrayFieldset.AddButton = AddButton;
ArrayFieldset.DeleteButton = DeleteButton;
ArrayFieldset.MoveUpButton = MoveUpButton;
ArrayFieldset.MoveDownButton = MoveDownButton;

if (process.env.NODE_ENV !== 'production') {
	ArrayFieldset.propTypes = {
		...FieldsetTemplate.propTypes,
		children: PropTypes.node,
		id: PropTypes.string.isRequired,
		initialNbItems: PropTypes.number,
		name: PropTypes.string.isRequired,
		rules: PropTypes.object,
		rhf: PropTypes.object.isRequired,
	};
}
