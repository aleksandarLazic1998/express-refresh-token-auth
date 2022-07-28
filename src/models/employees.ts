import { Schema, model } from "mongoose";

const EmployeesSchema = new Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const EmployeeModel = model("Employee", EmployeesSchema);
export default EmployeeModel;
