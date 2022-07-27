import { check } from "express-validator";

export const authValidation = () => {
	return [
		check("email", "Email must be in valid format.").isEmail(),
		check("password", "Password must be larger than 8 characters.").isLength({
			min: 8,
		}),
	];
};
