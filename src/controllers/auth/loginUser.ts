import { Request, Response } from "express";
import { validationResult } from "express-validator";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

import { ENV_CONST } from "../../constants/env";
import UsersModel from "../../models/users";
import { COOKIE_OPTIONS } from "../../constants/cookies";

export const loginUser = async (req: Request, res: Response) => {
	const refreshTokenCookie = req.cookies["refresh-token"];
	const { email, password } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const foundUser = await UsersModel.findOne({ email }).exec();
	if (!foundUser) {
		return res
			.status(422)
			.json({ errors: [{ msg: `Email or password is not matching.` }] });
	}

	const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
	if (!isPasswordCorrect) {
		return res
			.status(422)
			.json({ errors: [{ msg: `Email or password is not matching.` }] });
	}

	let userRoles: number[] = [];
	if (foundUser.roles) userRoles = Object.values(foundUser.roles);

	const accessToken = await JWT.sign(
		{ userInfo: { email: foundUser.email, roles: userRoles } },
		ENV_CONST.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1h" }
	);

	const newRefeshToken = await JWT.sign(
		{ userInfo: { email: foundUser.email } },
		ENV_CONST.REFRESH_TOKEN_SECRET,
		{ expiresIn: "10d" }
	);

	let listOfRefreshTokens = foundUser.refreshToken;

	if (refreshTokenCookie) {
		listOfRefreshTokens = [
			...foundUser.refreshToken.filter((rt) => rt !== refreshTokenCookie),
			newRefeshToken,
		];

		/* Reuse Detection Case: User logs in and never logs out, then refresh token is stolen  */
		const matchingUser = await UsersModel.findOne({
			refreshToken: refreshTokenCookie,
		}).exec();
		if (!matchingUser) {
			listOfRefreshTokens = [];
			return res
				.status(403)
				.json({ errors: [{ msg: "Attempted to login as someone else." }] });
		}

		res.clearCookie("refresh-token", COOKIE_OPTIONS);
	}

	foundUser.refreshToken = listOfRefreshTokens;
	await foundUser.save();

	res.cookie("refresh-token", newRefeshToken, COOKIE_OPTIONS);
	return res.status(201).json({
		message: "Successfully logged in.",
		user: foundUser,
		token: accessToken,
	});
};
