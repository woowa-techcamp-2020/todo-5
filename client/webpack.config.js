const env = process.env.NODE_ENV || 'development';
const webpack =
	env === 'production' ? require('./webpack-prod.config') : require('./webpack-dev.config');

module.exports = webpack;
