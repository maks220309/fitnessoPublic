import jwt, { Secret } from 'jsonwebtoken';
import tokenModel from '../models/token-model';
import ApiError from '../exceptions/api-error';

interface TokenPayload {
	id: string;
	username: string;
}
interface Tokens {
	accessToken: string;
	refreshToken: string;
}

class TokenService {
	accessTokenSecret: Secret = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
	refreshTokenSecret: Secret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
	generateTokens(payload: TokenPayload): Tokens {
		const accessTokenSecret: Secret = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
		const refreshTokenSecret: Secret = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

		const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '30m' });
		const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '30d' });

		return {
			accessToken,
			refreshToken
		};
	}
	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await tokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await tokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	async findToken(refreshToken: string) {
		const tokenData = await tokenModel.findOne({ refreshToken });
		return tokenData;
	}

	validateAccessToken(accessToken: string) {
		try {
			const userData = jwt.verify(accessToken, this.accessTokenSecret);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(refreshToken: string) {
		try {
			const userData = jwt.verify(refreshToken, this.refreshTokenSecret);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async getUserId(refreshToken: string) {
		const tokenOfUser = await tokenModel.findOne({ refreshToken });
		if (!tokenOfUser) {
			throw ApiError.BadRequest('Неверный токен');
		}
		return tokenOfUser.user;
	}
}

export default new TokenService();
