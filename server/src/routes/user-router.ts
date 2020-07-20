import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();
userRouter.route('/').get(UserController.getUser).post(UserController.registerUser);
userRouter.route('/:uid').get(UserController.getUserById);

export default userRouter;
