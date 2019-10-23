// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const getConfig = require('../../../.storybook/webpack.config');
module.exports = ({ config }) => {
	const commonModule = getConfig({ config });
	commonModule.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: require.resolve('awesome-typescript-loader'),
			},
			// Optional
			{
				loader: require.resolve('react-docgen-typescript-loader'),
			},
		],
	});
	commonModule.resolve.extensions.push('.ts', '.tsx');
	return commonModule;
};
