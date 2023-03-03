import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	firstName: { type: String, required: false },
	email: { type: String, required: true, unique: true, select: false },
	password: { type: String, required: true, select: false },
	verified: { type: Boolean, default: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
