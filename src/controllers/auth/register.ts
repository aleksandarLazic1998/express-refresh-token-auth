import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { responseWithMessage } from "../../config/responseWithMessage";

export const registerUser = (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return responseWithMessage({
			res,
			status: 422,
			messages: errors.array(),
			type: "error",
		});
	}
};
