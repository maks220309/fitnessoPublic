import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import tasksService from './service/tasks-service';

dotenv.config();

import router from './router';
import errorMiddleware from './middlewares/error-middleware';

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(
	express.json({
		limit: '10mb'
	})
);
app.use(
	bodyParser.json({
		limit: '10mb'
	})
);
app.use(cookieParser());
app.use(
	cors({
		origin: `${process.env.CLIENT_URL}`,
		credentials: true
	})
);

app.use('/api', router);
app.use(errorMiddleware);

let start = async (): Promise<void> => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URL}`);
		console.log('Connected');
		app.listen(PORT, () => console.log('server started on port ' + PORT));
		tasksService.deleteCompletedTasks();
	} catch (e) {
		console.log(e);
	}
};

start();
