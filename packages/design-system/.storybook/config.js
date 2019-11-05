import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

//import './i18n';

addDecorator(withA11y);

// automatically import all files ending in *.stories.js
configure(
	[
		require.context('../../components/stories', true, /\.stories\.js$/),
		//require.context('../../datagrid/stories', true, /\.stories\.js$/),
		//require.context('../stories', true, /\.stories\.mdx$/),
	],
	module,
);
