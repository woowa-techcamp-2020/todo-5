import { Router, Request, Response, NextFunction } from 'express';
import userRouter from './user_router';

const router = Router();
router.route('/').get((req: Request, res: Response, next: NextFunction) => {
	//디비에서 로그인 정보와 맞는 서비스 정보를 로드함.
	res.render('index');
});

const routes = router;
export { routes, userRouter };
