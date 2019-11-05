const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";
const path = require('path');
const webpack = require.main.require('webpack');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const icons = require.resolve('@talend/icons/dist/info');
const iconsDist = path.dirname(icons);
const babelConfig = require('../.babelrc.json');

module.exports = ({ config }) => {
	// Override css part to apply custom postcss config
	const cssRuleIndex = config.module.rules.findIndex(
		({ test }) => test.toString() === /\.css$/.toString(),
	);

	config.module.rules[0].use[0].options.sourceType = 'unambiguous';
	config.module.rules[cssRuleIndex] = {
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					plugins: () => [autoprefixer()],
				},
			},
		],
	};

	config.module.rules.push(
		{
			test: /theme.scss$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [autoprefixer()],
					},
				},
				{
					loader: 'sass-loader',
					options: {
						prependData: SASS_DATA,
					},
				},
			],
		},
		{
			test: /\.scss$/,
			exclude: /theme.scss/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: {
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
						importLoaders: 1,
					},
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [autoprefixer()],
					},
				},
				{
					loader: 'sass-loader',
					options: {
						prependData: SASS_DATA,
					},
				},
			],
		},

		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: babelConfig,
			},
		},
	);
	config.plugins = config.plugins.concat(
		new CopyPlugin([{ from: path.join(iconsDist, 'svg-bundle') }]),
		new webpack.DefinePlugin({
			'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
		}),
	);
	return config;
};
