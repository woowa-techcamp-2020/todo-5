// import {Request, Response, NextFunction} from 'express';

import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Card } from "../models";

class CardController {
  constructor(){}
  static async create(req: Request, res: Response, next: NextFunction) {
    let response;
    let { body } = req;
    try {
      response = await Card.create(body);
    } catch(err) {
      logger.error('card create fail', err);
      next(err);
    }
   }
}

export default CardController;