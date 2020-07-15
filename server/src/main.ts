import http from 'http';
import { env, port } from './config/vars';
import logger from './config/logger';
import app from './config/express';
import pool from './modules/database/database';

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
		const connection = await (await pool()).getConnection();
		const ping = await connection.ping();
		logger.info('db connected');
		connection.release();
	} catch (e) {
		logger.error(e);
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
