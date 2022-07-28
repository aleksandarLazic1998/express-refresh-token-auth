import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import EmployeeModel from "../../models/employees";

export const editEmployee = async (req: Request, res: Response) => {
	const employeeId = req.params.id;
	const { firstname, lastname } = req.body;

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

	foundEmployee.firstname = firstname;
	foundEmployee.lastname = lastname;
	await foundEmployee.save();

	const data = await EmployeeModel.find({}).exec();

	return res.status(201).json({ data });
};
