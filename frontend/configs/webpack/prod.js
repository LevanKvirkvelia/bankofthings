// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
	mode: 'production',
	entry: './index.tsx',
	output: {
		filename: 'js/bundle.[contenthash].min.js',
		path: resolve(__dirname, '../../dist'),
		publicPath: '/',
	},
	devtool: 'source-map',
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: resolve(__dirname, '../../src/manifest.json'),
					to: resolve(__dirname, '../../dist/manifest.json'),
				},
			],
		}),
	],
});
