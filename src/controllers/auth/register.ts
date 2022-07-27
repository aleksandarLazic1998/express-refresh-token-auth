import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { responseWithMessage } from "../../config/responseWithMessage";
import UsersModel from "../../models/users";
import { ENV_CONST } from "../../constants/env";
import { IUser } from "../../typescript/interfaces/User";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, isManager, isAdmin } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return responseWithMessage({
			res,
			status: 422,
			messages: errors.array(),
			type: "error",
		});
	}

	const foundUser = await UsersModel.findOne({ email }).exec();
	if (foundUser) {
		return responseWithMessage({
			res,
			status: 409,
			messages: [{ msg: `User with email: ${foundUser} arleady exist.` }],
			type: "error",
		});
	}

	const hashPassword = await bcrypt.hash(password, 10);

	let newUser: IUser = {
		email,
		password: hashPassword,
		roles: { User: +ENV_CONST.USER_ROLE },
	};

	if (isManager) {
		newUser = {
			...newUser,
			roles: { ...newUser.roles, Manager: +ENV_CONST.MANAGER_ROLE },
		};
	}
	if (isAdmin) {
		newUser = {
			...newUser,
			roles: {
				...newUser.roles,
				Manager: +ENV_CONST.MANAGER_ROLE,
				Admin: +ENV_CONST.ADMIN_ROLE,
			},
		};
	}

	await UsersModel.create(newUser);
	return responseWithMessage({
		res,
		status: 201,
		messages: `Successfully created user with email:${newUser.email}`,
		type: "sucess",
	});
};
