const env = process.env.NODE_ENV || 'development';
const webpack =
	env === 'production' ? require('./webpack-pod.config') : require('./webpack-pod.config');

module.exports = webpack;
