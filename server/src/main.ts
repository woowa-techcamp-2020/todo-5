import http from 'http';
import { env, port } from './config/vars';
import logger from './config/logger';
import app from './config/express';

const stopServer = async (server: http.Server, signal?: string) => {
	logger.info(`Stopping server with signal: ${signal}`);
	await server.close();
	process.exit();
};

const runServer = async () => {
	const server = app.listen(port, () => {
		logger.info(`server started on port ${port} (${env})`);
	});
	try {
		logger.info('db connect');
	} catch (e) {
		stopServer(server, 'db is failed to start');
		throw e;
	}
};

runServer()
	.then(() => {
		logger.info('run succesfully');
	})
	.catch((ex: Error) => {
		logger.error('Unable run: ', ex);
	});
