const path = require('path');

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
							sourceMap: true,
						},
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
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
