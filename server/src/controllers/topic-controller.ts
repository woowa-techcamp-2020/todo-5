import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { Topic } from '../models';
import httpStatus from 'http-status';
import { JsonResponse } from '../modules/Utils';

class TopicController {
	constructor() {}
	static async create(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await Topic.create(body);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'topic created well', response));
		} catch (err) {
			logger.error('topic create fail', err);
			next(err);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		let response;
		const { body } = req;
		try {
			response = await Topic.update(body);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'topic updated well', response));
		} catch (err) {
			logger.error('topic updated fail', err);
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		let response;
		const topic_id = parseInt(req.params.topic_id);
		try {
			response = await Topic.delete(topic_id);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'topic deleted well', response));
		} catch (err) {
			logger.error('topic deleted fail', err);
			next(err);
		}
	}

	static async getTopicsByServiceId(req: Request, res: Response, next: NextFunction) {
		let response;
		const serviceId = req.params.service_id;
		try {
			response = await Topic.getTopicsByServiceId(serviceId);
			if (response.result === null) {
				new Error('no topic exists');
			}
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'topic get well', response));
		} catch (err) {
			logger.error('topic get fail', err);
			next(err);
		}
	}
}

export default TopicController;
