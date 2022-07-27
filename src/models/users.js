import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	roles: { User: { type: Number, default: 3 }, Manager: Number, Admin: Number },
	refreshToken: [String],
});

const UsersModel = model("User", UsersSchema);

export default UsersModel;
