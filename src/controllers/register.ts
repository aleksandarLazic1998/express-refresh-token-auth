import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UsersModel from "../models/users";
import { IUser } from "../typescript/interfaces/User";
import { ENV_CONST } from "../constants/env";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password, isManager, isAdmin } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const foundUser = await UsersModel.findOne({ email }).exec();
	if (foundUser) {
		return res.status(409).json({
			errors: [{ msg: `User with email: ${foundUser} arleady exist.` }],
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

	return res.status(201).json({
		message: `Successfully created user with email:${newUser.email}`,
	});
};
