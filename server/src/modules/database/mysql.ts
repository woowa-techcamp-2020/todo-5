import promiseMysql from 'mysql2/promise';
import { database } from './connection';

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
	export const connect = (fn: Function) => async (...args: any) => {
		let con: any = await pool.getConnection();
		const result = await fn(con, ...args).catch((err: Error) => {
			con.connection.release();
			throw err;
		});
		con.connection.release();

		return result;
	};

	/**
	 * 트렌젝션 처리시 사용
	 */
	export const transaction = (fn: Function) => async (...args: any) => {
		let con: any = await pool.getConnection();
		await con.connection.beginTransaction();
		const result = await fn(con, ...args).catch(async (err: Error) => {
			await con.rollback();
			con.connection.release();
			throw err;
		});
		await con.commit();
		con.connection.release();

		return result;
	};
}
