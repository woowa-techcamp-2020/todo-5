import { Router } from 'express';
import { CardController } from '../controllers';

const cardRouter = Router();
cardRouter.route('/').post(CardController.create);
cardRouter.route('/update').post(CardController.update);
cardRouter.route('/delete/:card_id').patch(CardController.delete);
cardRouter.route('/:topic_id').get(CardController.getCardsByTopicId);

export default cardRouter;
