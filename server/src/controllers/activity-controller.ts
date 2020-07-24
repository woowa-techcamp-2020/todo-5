import { Request, Response, NextFunction } from 'express';
import { Activity } from '../models';
import httpStatus from 'http-status';
import { JsonResponse } from '../modules/Utils';

class ActivityController {
	constructor() {}
	static async create(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await Activity.create(body);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'activity created well', response));
		} catch (err) {
			next(err);
		}
	}

	static async getActivitiesByServiceId(req: Request, res: Response, next: NextFunction) {
		let response;
		const serviceId = req.params.service_id;
		try {
			response = await Activity.getActivitiesByServiceId(serviceId);
			if (response.result === null) {
				new Error('no activity exists');
			}
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'activities get well', response));
		} catch (err) {
			next(err);
		}
	}
}

export default ActivityController;
