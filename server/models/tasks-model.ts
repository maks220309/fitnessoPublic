import { Document, Schema, model } from 'mongoose';

interface ITask extends Document {
	user: Schema.Types.ObjectId;
	name: string;
	description: string;
	status: boolean;
	taskSet: number;
	timeToSet: number;
	timeToBreak: number;
	date: Date;
}

const TokenSchema = new Schema<ITask>({
	user: { type: Schema.Types.ObjectId, ref: 'Users' },
	name: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: Boolean, default: false },
	taskSet: { type: Number },
	timeToSet: { type: Number },
	timeToBreak: { type: Number },
	date: { type: Date, default: Date.now }
});

export default model('Task', TokenSchema);
