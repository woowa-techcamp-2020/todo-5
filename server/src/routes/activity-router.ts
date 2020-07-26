import { Router } from 'express';
import { ActivityController } from '../controllers';

const activittyRouter = Router();
activittyRouter.route('/').post(ActivityController.create);
activittyRouter.route('/:service_id').get(ActivityController.getActivitiesByServiceId);
activittyRouter.route('/:service_id/:min/:max').get(ActivityController.getActivitiesByPagination);
activittyRouter.route('/page/:service_id').get(ActivityController.getMaximumNumber);

export default activittyRouter;
