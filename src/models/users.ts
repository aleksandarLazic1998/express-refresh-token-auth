import { Schema, model } from "mongoose";
import { ENV_CONST } from "../constants/env";

const UsersSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	roles: {
		User: { type: Number, default: ENV_CONST.USER_ROLE },
		Manager: Number,
		Admin: Number,
	},
	refreshToken: [String],
});

const UsersModel = model("User", UsersSchema);

export default UsersModel;
