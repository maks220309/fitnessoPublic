import ApiError from '../exceptions/api-error';
import taskModel from '../models/tasks-model';

class tasksService {
	async deleteCompletedTasks() {
		try {
			await taskModel.deleteMany({ status: false });
		} catch (e) {
			throw ApiError.BadRequest('Не удалось удалить завершенные задачи');
		}
	}

	async newTask(
		userId: string,
		name: string,
		description: string,
		taskSet: string,
		timeToSet: string,
		timeToBreak: string
	) {
		try {
			let r = await taskModel.create({
				user: userId,
				name,
				description,
				taskSet,
				timeToSet,
				timeToBreak,
				status: false
			});
			return r._id;
		} catch (e) {
			throw ApiError.BadRequest('Не удалось создать задачу');
		}
	}
}

export default new tasksService();
