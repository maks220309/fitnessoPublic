import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
	email: string;
	username: string;
	password: string;
	isActivated: boolean;
	activationLink: string;
	avatar: string;
	comVal: number;
	tasks: any[];
	calendar: any[];
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	activationLink: { type: String },
	isActivated: { type: Boolean, default: false },
	comVal: { type: Number, default: 0 },
	avatar: {
		type: String,
		default: "https://thumbs2.imgbox.com/09/51/8yhLUcMr_t.jpg",
	},
	tasks: { type: [], default: [] },
	calendar: { type: [], default: [] },
});

export default model("Users", UserSchema);
