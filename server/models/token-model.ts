import { Document, Schema, model } from 'mongoose';

interface IToken extends Document {
	refreshToken: string;
	user: Schema.Types.ObjectId;
}

const TokenSchema = new Schema<IToken>({
	user: { type: Schema.Types.ObjectId, ref: 'Users' },
	refreshToken: { type: String }
});

export default model('Tokens', TokenSchema);
