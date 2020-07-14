import { Request, Response, NextFunction } from 'express';
import HttpException from './http-exception';
import HttpStatus from 'http-status';
// import { env } from '../../config/vars';

// const NotFoundError = (req: Request, res: Response, next: NextFunction) => {
// 	const response = {
// 		result: 'ERROR',
// 		code: 'NotFound',
// 		message: req.url + ' not found',
// 	};

// 	// env === 'production'
// 	// 	? res.status(httpStatus.NOT_FOUND).redirect('/not_found').json(response)
// 	// 	: res.status(httpStatus.NOT_FOUND).json(response);
// 	res.status(httpStatus.NOT_FOUND).json(response);
// };

// export default (app: Express) => {
// 	app.use(NotFoundError);
// };

const errorMiddleware = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
	const message = error.message || 'Something went wrong';
	response.status(status).send({
		status,
		message,
	});
};

export default errorMiddleware;
