import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { Card } from '../models';
import httpStatus from 'http-status';
import { JsonResponse } from '../modules/Utils';

class CardController {
	constructor() {}
	static async create(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await Card.create(body);
			res
				.status(httpStatus.CREATED)
				.json(JsonResponse(httpStatus.CREATED, 'card created well', response));
		} catch (err) {
			logger.error('card create fail', err);
			next(err);
		}
	}

	static async getCardsByTopicId(req: Request, res: Response, next: NextFunction) {
		let response;
		const topicId = req.params.topic_id;
		try {
			response = await Card.getCardsBytopicId(topicId);
			if (response.result === null) {
				new Error('no topic exists');
			}
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'cards get well', response));
		} catch (err) {
			logger.error('cards get fail', err);
			next(err);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await Card.update(body);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'card updated well', response));
		} catch (err) {
			logger.error('card updated fail', err);
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		let response;
		let { body } = req;
		try {
			response = await Card.delete(body);
			res.status(httpStatus.OK).json(JsonResponse(httpStatus.OK, 'card deleted well', response));
		} catch (err) {
			logger.error('card deleted fail', err);
			next(err);
		}
	}
}

export default CardController;
