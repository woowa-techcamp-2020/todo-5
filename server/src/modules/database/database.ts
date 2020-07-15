import { database } from './connection';
import mysql from 'mysql2/promise';

const getPool = async () => {
	return await mysql.createPool(database);
};

export default getPool;
