import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import EmployeeModel from "../../models/employees";

export const getSingleEmployee = async (req: Request, res: Response) => {
	const employeeId = req.params.id;

	const isIdValid = isValidObjectId(employeeId);

	if (!isIdValid) {
		return res
			.status(422)
			.json({ errors: [{ msg: `Employee id: ${employeeId} is not valid.` }] });
	}

	const foundEmployee = await EmployeeModel.findOne({ _id: employeeId }).exec();

	if (!foundEmployee) {
		return res.status(404).json({
			errors: [
				{ msg: `There is no matching employee with id: ${employeeId}.` },
			],
		});
	}

	return res.status(200).json({ data: foundEmployee });
};
