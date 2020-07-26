import winston from 'winston';
import { env } from './vars';
const { combine, timestamp, printf } = winston.format;
const winstonDaily = require('winston-daily-rotate-file');
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`);

const logger = winston.createLogger({
	transports: [
		new winstonDaily({
			name: 'error-file',
			filename: 'logs/error',
			level: 'error',
			datePattern: 'yyyy-MM-dd.log',
			json: false,
			prepend: true,
			format: combine(timestamp(), myFormat),
		}),
		new winstonDaily({
			name: 'combined-file',
			filename: 'logs/combined',
			datePattern: 'yyyy-MM-dd.log',
			json: false,
			prepend: true,
			format: combine(timestamp(), myFormat),
		}),
	],
});

if (env !== 'production') {
	logger.add(
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: combine(timestamp(), myFormat),
		})
	);
}

export default logger;
