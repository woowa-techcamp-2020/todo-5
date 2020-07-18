import winston from 'winston';
import { env } from './vars';
import { info } from 'console';
const winstonDaily = require('winston-daily-rotate-file');

const timeStampFormant = () => Date().toLocaleLowerCase();

const logger = winston.createLogger({
	transports: [
		new winstonDaily({
			name: 'error-file',
			filename: 'logs/error',
			level: 'error',
			datePattern: 'yyyy-MM-dd.log',
			timestamp: timeStampFormant(),
			json: false,
			prepend: true,
		}),
		new winstonDaily({
			name: 'combined-file',
			filename: 'logs/combined',
			datePattern: 'yyyy-MM-dd.log',
			timestamp: timeStampFormant(),
			json: false,
			prepend: true,
		}),
	],
});

if (env !== 'production') {
	logger.add(
		new winston.transports.Console({
			level: 'info',
			format: winston.format.simple(),
		})
	);
}

export default logger;
