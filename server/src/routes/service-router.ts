import { Router } from 'express';
import { ServiceController } from '../controllers';

const serviceRouter = Router();
serviceRouter.route('/').post(ServiceController.create);

export default serviceRouter;