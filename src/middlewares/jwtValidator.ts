/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { ENV_CONST } from "../constants/env";

export const jwtValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req?.headers?.authorization;
	if (!accessToken) return res.sendStatus(401);

	if (!accessToken.includes("Bearer")) return res.sendStatus(403);
	JWT.verify(
		accessToken.split(" ")[1],
		ENV_CONST.ACCESS_TOKEN_SECRET,
		(error, decoded) => {
			if (error) return res.sendStatus(403);

			// @ts-ignore
			req.email = decoded.userInfo.email;
			// @ts-ignore
			req.roles = decoded.userInfo.roles;

			next();
		}
	);
};
