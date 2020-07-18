import { env } from '../../config/vars';

const database = {
	database: env === 'production' ? 'todo05' : 'kitty05',
	user: 'todo05',
	password: '1234',
	host: '13.209.83.0',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
};

export { database };
