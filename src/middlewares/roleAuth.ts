/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from "express";

export const roleAuth = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const authenticatedRoles: boolean[] = req
			// @ts-ignore-next-line
			.roles!.map((role) => {
				console.log(role);
				console.log(roles);

				return roles.includes(String(role));
			})
			.filter(Boolean);

		if (authenticatedRoles.length === 0) return res.sendStatus(403);

		next();
	};
};
