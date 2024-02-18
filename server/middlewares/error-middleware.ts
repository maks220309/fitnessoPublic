import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';

export default (err: ApiError | any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message });
	}
	console.error(err);
	return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
