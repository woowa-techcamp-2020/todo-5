import { Request, Response, NextFunction } from 'express';
import HttpException from './http-exception';
import HttpStatus from 'http-status';

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
