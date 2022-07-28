import { Response, Request } from "express";
import JWT from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants/cookies";
import { ENV_CONST } from "../constants/env";
import UsersModel from "../models/users";

export const refreshToken = async (req: Request, res: Response) => {
	const refreshTokenCookie = req.cookies["refresh-token"];

	if (!refreshTokenCookie) return res.sendStatus(401);

	res.clearCookie("refresh-token", COOKIE_OPTIONS);

	const foundUser = await UsersModel.findOne({
		refreshToken: refreshTokenCookie,
	}).exec();

	if (!foundUser) {
		JWT.verify(
			refreshTokenCookie,
			ENV_CONST.REFRESH_TOKEN_SECRET,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			async (err: any, decoded: any) => {
				if (err) return res.sendStatus(403);

				const hackedUser = await UsersModel.findOne({
					email: decoded.userInfo.email,
				});

				if (hackedUser) {
					hackedUser.refreshToken = [];
					await hackedUser?.save();
				}
			}
		);

		return res.sendStatus(403);
	}

	const filteredTokenList = foundUser.refreshToken.filter(
		(rt) => rt !== refreshTokenCookie
	);

	JWT.verify(
		refreshTokenCookie,
		ENV_CONST.REFRESH_TOKEN_SECRET,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async (err: any, decoded: any) => {
			if (err || decoded.userInfo.email !== foundUser.email) {
				foundUser.refreshToken = filteredTokenList;
				await foundUser.save();

				return res.sendStatus(403);
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

			const refreshTokenList = [...filteredTokenList, newRefeshToken];
			foundUser.refreshToken = refreshTokenList;
			await foundUser.save();

			res.cookie("refresh-token", newRefeshToken, COOKIE_OPTIONS);
			return res.status(200).json({ token: accessToken });
		}
	);
};
