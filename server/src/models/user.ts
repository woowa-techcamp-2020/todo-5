import { mysql } from '../modules/database/mysql';
import { UserDTO } from '../../../shared/dto';
import logger from '../config/logger';

class User {
	constructor() {}

	/**
	 * admin test용 전체 user 출력
	 */
	static async getUser() {
		let userData: [];
		try {
			userData = await mysql.connect((con: any) => con.query('SELECT * FROM user'));
		} catch (err) {
			throw err;
		}
		return [...userData][0];
	}

	/**
	 * user id로 user 출력
	 * @param id
	 */
	static async getUserById(uid: string) {
		let userData;
		try {
			userData = await mysql.connect((con: any) =>
				con.query(`SELECT user_id, uid, name FROM user where user.uid = '${uid}'`)
			);
		} catch (err) {
			throw err;
		}
		return [...userData][0][0];
	}

	/**
	 * user 등록하는 메소드
	 * @param user
	 */
	static async registerUser(user: UserDTO.CREATE) {
		let userData;
		try {
			userData = await mysql.connect((con: any) => {
				return con.query(`INSERT INTO user (uid, name) VALUES('${user.uid}', '${user.name}')`);
			});
			const user_id = userData[0].insertId;
			const result: UserDTO.RESPONSE = { ...user, user_id };
			return result;
		} catch (err) {
			throw err;
		}
	}
}

export default User;
