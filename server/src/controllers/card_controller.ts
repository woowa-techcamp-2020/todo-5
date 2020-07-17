import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Card } from "../models";
import httpStatus from "http-status";
import { JsonResponse } from "../modules/Utils";

class CardController {
  constructor(){}
  static async create(req: Request, res: Response, next: NextFunction) {
    let response;
    let { body } = req;
    try {
      response = await Card.create(body);
      res.status(httpStatus.CREATED)
      .json(JsonResponse(httpStatus.CREATED, 'card created well', response));
    } catch(err) {
      logger.error('card create fail', err);
      next(err);
    }
   }
}

export default CardController;