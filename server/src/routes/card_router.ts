import { Router } from 'express';
import { CardController } from '../controllers';

const cardRouter = Router();
cardRouter.route('/').post(CardController.create);

export default cardRouter;