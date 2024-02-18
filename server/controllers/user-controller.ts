import { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";

import { validationResult } from "express-validator";

import ApiError from "../exceptions/api-error";

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Валидация не прошла"));
			}
			const { email, password, username, base64 } = req.body;
			const userData = await userService.registration(
				email,
				password,
				username,
				base64
			);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "none",
				secure: true, // Разрешено отправлять cookie в запросах с другого сайта
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "none",
				secure: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			const CLIENT_URL: string = process.env.CLIENT_URL || "default url";
			return res.redirect(CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			if (userData != null) {
				res.cookie("refreshToken", userData.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});
			}
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.me(refreshToken);
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async tasksGen(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const tasks = await userService.tasksGen(refreshToken);
			return res.json(tasks);
		} catch (e) {
			next(e);
		}
	}

	async task(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const task = await userService.task(req.params.id, refreshToken);
			return res.json(task);
		} catch (e) {
			next(e);
		}
	}

	async taskComplete(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const task = await userService.completeTask(req.params.id, refreshToken);
			return res.json(task);
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
