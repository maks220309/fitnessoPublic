class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован');
	}

	static problemsWithEmail() {
		return new ApiError(401, 'Почта не аткивирована');
	}

	static BadRequest(message: string) {
		return new ApiError(400, message);
	}
}

export default ApiError;
