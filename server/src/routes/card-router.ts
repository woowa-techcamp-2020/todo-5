import { Router } from 'express';
import { CardController } from '../controllers';

const cardRouter = Router();
cardRouter.route('/').post(CardController.create);
cardRouter.route('/update').patch(CardController.update);
cardRouter.route('/delete/:card_id').patch(CardController.delete);
cardRouter.route('/delete-all/:topic_id').patch(CardController.deleteAllByTopicId);
cardRouter.route('/:topic_id').get(CardController.getCardsByTopicId);

export default cardRouter;
