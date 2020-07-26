import logger from './logger';

export default class LoggerStream {
	write(message: string) {
		logger.info(message.substring(0, message.lastIndexOf('\n')));
	}
}
