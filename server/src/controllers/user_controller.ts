import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';
import logger from '../config/logger';
import { User } from '../models';
import { JsonResponse } from '../modules/Utils';

class UserController {
	constructor() {}
	static async getUser(req: Request, res: Response, next: NextFunction) {
		let response;
		try {
			response = await User.getUser();
			res.status(HttpStatus.OK).json(JsonResponse(HttpStatus.OK, 'Get User ALL', response));
		} catch (err) {
			logger.error('get user list error');
			next(err);
		}
	}

	static async getUserById(req: Request, res: Response, next: NextFunction) {
		let response;
		const uid = req.params.uid;
		try {
			response = await User.getUserById(uid);
			if (response.result === null) {
				new Error(`no user exists by ${uid}`);
			}
			res.status(HttpStatus.OK).json(JsonResponse(HttpStatus.OK, 'Get User By uid', response));
		} catch (err) {
			logger.error('get user by uid error');
			next(err);
		}
	}

	static async registerUser(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await User.registerUser(body);
			res
				.status(HttpStatus.CREATED)
				.json(JsonResponse(HttpStatus.CREATED, 'user created well', response));
		} catch (err) {
			next(err);
		}
	}
}

export default UserController;
