/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import ColumnChooserButton, {
	ColumnChooser,
} from '@talend/react-components/lib/List/Toolbar/ColumnChooserButton';

const icons = {
	'talend-locked': talendIcons['talend-locked'],
	'talend-column-chooser': talendIcons['talend-column-chooser'],
};

const columns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{
		key: 'modified',
		label: 'Very long name long name long name long name long name',
		order: 4,
		header: 'icon',
		data: { iconName: 'talend-scheduler' },
	},
	{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
];

storiesOf('Components|Column Chooser', module)
	.addParameters({ component: ColumnChooser })
	.addDecorator(storyFn => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{storyFn()}
		</div>
	))
	.add('Chooser', () => (
		<ColumnChooser
			columnsFromList={columns}
			nbLockedLeftItems={2}
			id="default-column-chooser"
			onSubmit={action('submit')}
		/>
	))
	.add('Button and popover', () => (
		<ColumnChooserButton
			columns={columns}
			nbLockedLeftItems={2}
			id="column-chooser-btn"
			onSubmit={action('submit')}
			placement="bottom"
		/>
	));
