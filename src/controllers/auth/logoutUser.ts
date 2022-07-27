import { Request, Response } from "express";
import { COOKIE_OPTIONS } from "../../constants/cookies";
import UsersModel from "../../models/users";

export const logoutUser = async (req: Request, res: Response) => {
	const accessToken = req.headers.authorization;
	const refreshTokenCookie = req.cookies["refresh-token"];

	if (!accessToken) {
		res.clearCookie("refresh-token", COOKIE_OPTIONS);
		return res.sendStatus(204);
	}

	const foundUser = await UsersModel.findOne({
		refreshToken: refreshTokenCookie,
	});
	if (!foundUser) {
		res.clearCookie("refresh-token", COOKIE_OPTIONS);
		return res.sendStatus(204);
	}

	foundUser.refreshToken = foundUser.refreshToken.filter(
		(rt) => rt !== refreshTokenCookie
	);
	await foundUser.save();

	res.clearCookie("refresh-token", COOKIE_OPTIONS);
	return res.sendStatus(204);
};
