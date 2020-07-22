const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, '../server/src/public/dist'),
		filename: '[name].js',
	},
	devtool: 'cheap-eval-source-map',
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	plugins: [
		new Dotenv({
			path: path.join(__dirname, '../shared/config.env'),
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
				use: [
					require.resolve('style-loader'),
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: process.env.NODE_ENV === 'production' ? false : true,
						},
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: process.env.NODE_ENV === 'production' ? false : true,
						},
					},
				],
			},
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
