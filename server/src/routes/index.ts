import { Router } from 'express';

const router = Router();
router.get('/', (req, res, next) => {
	res.render('index');
});

const routes = router;
const userRoute = 'u';
export { routes, userRoute };
