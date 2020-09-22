const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'production',
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, '../server/src/public/dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	plugins: [
		new Dotenv({
			path: path.join(__dirname, '../shared/.env'),
			systemvars: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg)$/,
				use: ['file-loader'],
			},
			{
				test: /\.ts$/,
				use: ['ts-loader'],
			},
			{
				test: /\.(scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
