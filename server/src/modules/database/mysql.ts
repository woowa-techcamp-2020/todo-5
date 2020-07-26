import promiseMysql from 'mysql2/promise';
import { database } from './connection';
import logger from '../../config/logger';

const pool = promiseMysql.createPool(database);

export module mysql {
	export const ping = async () => {
		let con: any = await pool.getConnection();
		con.ping().catch((err: Error) => {
			con.connection.release();
			throw err;
		});
		con.connection.release();
	};
	/**
	 * 일반 커넥트
	 */
	export const connect = async (fn: Function) => {
		let con: any = await pool.getConnection();
		const result = await fn(con).catch((err: Error) => {
			con.connection.release();
			throw err;
		});
		con.connection.release();
		return result;
	};
}
