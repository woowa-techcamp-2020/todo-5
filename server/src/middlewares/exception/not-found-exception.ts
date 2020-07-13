import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status';

const notFoundException = (req: Request, res: Response, next: NextFunction) => {
	res.status(HttpStatus.NOT_FOUND).render('not-found', { title: 'Sorry, page not found' });
};

export default notFoundException;
