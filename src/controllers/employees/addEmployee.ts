import { Request, Response } from "express";
import EmployeeModel from "../../models/employees";

export const addEmployee = async (req: Request, res: Response) => {
	const { firstname, lastname } = req.body;

	if (!firstname || !lastname) {
		return res.status(422).json({
			errors: [{ msg: "Firstname and last name are required fields." }],
		});
	}

	const data = await EmployeeModel.create({ firstname, lastname });

	return res.status(201).json({ data });
};
