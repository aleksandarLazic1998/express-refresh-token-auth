import { Request, Response } from "express";
import EmployeeModel from "../../models/employees";

export const getEmployees = async (req: Request, res: Response) => {
	const { perPage = 10, page = 0, sortDirection = "asc" } = req.body;

	const employeesList = await EmployeeModel.find({})
		.limit(perPage)
		.skip(perPage * page)
		.sort({ firstname: sortDirection });

	console.log(employeesList);

	res.status(200).json({ data: employeesList });
};
