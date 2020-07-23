import { Router } from 'express';
import { ActivityController } from '../controllers';

const cardRouter = Router();
cardRouter.route('/').post(ActivityController.create);
cardRouter.route('/:service_id').get(ActivityController.getActivitiesByServiceId);

export default cardRouter;
