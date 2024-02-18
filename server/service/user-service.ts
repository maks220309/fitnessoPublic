import userModel from "../models/user-model";
import bcrypt from "bcrypt";
import { v4 as uuidv4, v4 } from "uuid";
import mailService from "./mail-service";
import tokenService from "./token-service";
import ApiError from "../exceptions/api-error";
import axios from "axios";

class UserService {
	async registration(
		email: string,
		password: string,
		username: string,
		base64: string
	) {
		const candidate = await userModel.findOne({
			$or: [{ email }, { username }],
		});
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с email: ${email} или username: ${username} существует`
			);
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = v4();

		const API_URL: string = process.env.API_URL || "default_URL";

		const user = await userModel.create({
			email,
			password: hashPassword,
			username,
			activationLink,
			avatar: base64,
		});
		await mailService.sendActivationMail(
			email,
			`${API_URL}/activate/${activationLink}`
		);

		const tokens = tokenService.generateTokens({
			id: user._id,
			username: user.username,
		});
		await tokenService.saveToken(user._id, tokens.refreshToken);
		return {
			...tokens,
			id: user._id,
			username: user.username,
		};
	}

	async activate(activationLink: string) {
		const user = await userModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest("Ссылка не верна");
		}
		user.isActivated = true;
		user.save();
	}

	async login(email: string, password: string) {
		const user = await userModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest("Неверная почта");
		}
		const isPassCorect = await bcrypt.compare(password, user.password);
		if (!isPassCorect) {
			throw ApiError.BadRequest("Неверный пароль");
		}
		const tokens = tokenService.generateTokens({
			id: user._id,
			username: user.username,
		});
		await tokenService.saveToken(user._id, tokens.refreshToken);
		return {
			...tokens,
			id: user._id,
			username: user.username,
		};
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		try {
			if (!refreshToken) {
				throw ApiError.UnauthorizedError();
			}

			const userData = tokenService.validateRefreshToken(refreshToken);
			const tokenFromDb = await tokenService.findToken(refreshToken);

			if (!userData || !tokenFromDb) {
				throw ApiError.UnauthorizedError();
			}
			if (typeof userData != "string") {
				const user = await userModel.findById(userData.id);

				if (user) {
					const tokens = tokenService.generateTokens({
						id: user._id,
						username: user.username,
					});
					await tokenService.saveToken(user._id, tokens.refreshToken);
					return {
						...tokens,
						id: user._id,
						username: user.username,
					};
				}
			}
			return null;
		} catch (e) {
			throw ApiError.UnauthorizedError();
		}
	}

	async getUserByRefreshToken(refreshToken: string) {
		const userId = await tokenService.getUserId(refreshToken);
		const user = await userModel.findById(userId, "-password");
		if (!user) {
			throw ApiError.BadRequest("Неверный токен");
		}
		return user;
	}

	async me(refreshToken: string) {
		const user = await this.getUserByRefreshToken(refreshToken);
		return user;
	}

	async tasksGen(refreshToken: string) {
		const user = await this.getUserByRefreshToken(refreshToken);
		const { data } = await axios.get(
			"https://coltto-usa-619357e32efa.herokuapp.com/tasksGenerate"
		);
		const tdbdbdd = data.data.map((el: any) => {
			return { ...el, id: uuidv4(), complete: false };
		});
		await userModel.findByIdAndUpdate(user._id, { tasks: tdbdbdd });
		return tdbdbdd;
	}

	async completeTask(taskId: string, refreshToken: string) {
		const user = await this.getUserByRefreshToken(refreshToken);
		const task = user.tasks.find((el: any) => el.id === taskId);
		if (!task) {
			throw ApiError.BadRequest("Неверный id задачи");
		}
		if (task.completed) {
			throw ApiError.BadRequest("Задача уже выполнена");
		}

		await userModel.findByIdAndUpdate(user._id, {
			$push: {
				calendar: {
					date: new Date().getDate(), // Adds the current day of the month
					taskId: taskId, // Adds the taskId
				},
			},
		});

		return task;
	}

	async task(taskId: string, refreshToken: string) {
		const user = await this.getUserByRefreshToken(refreshToken);
		const task = user.tasks.find((el: any) => el.id === taskId);
		if (!task) {
			throw ApiError.BadRequest("Неверный id задачи");
		}
		return task;
	}
}

export default new UserService();
