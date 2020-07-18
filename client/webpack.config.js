const path = require('path');
const { env } = require('../server/src/config/vars');
const webpack =
	env === 'production' ? require('./webpack-pod.config') : require('./webpack-pod.config');

module.exports = webpack;
