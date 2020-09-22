import { env } from '../../config/vars';

const database = {
	database: env === 'production' ? process.env.PROD_DB : process.env.DEV_DB,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	host: process.env.DB_HOST,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
};

export { database };
