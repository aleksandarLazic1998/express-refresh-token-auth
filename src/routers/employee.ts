import { Router } from "express";
import { addEmployee } from "../controllers/employees/addEmployee";
import { getEmployees } from "../controllers/employees/getEmployees";

const EmployeesRouter = Router();

EmployeesRouter.route("/").get(getEmployees).post(addEmployee);

export default EmployeesRouter;
