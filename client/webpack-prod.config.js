const path = require('path');

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
					},
					{
						loader: require.resolve('sass-loader'),
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
