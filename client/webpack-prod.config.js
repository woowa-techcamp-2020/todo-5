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
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: '> 1%, not dead',
									useBuiltIns: 'usage',
									corejs: '3',
									modules: false,
								},
							],
						],
						plugins: ['transform-remove-console'],
					},
				},
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
