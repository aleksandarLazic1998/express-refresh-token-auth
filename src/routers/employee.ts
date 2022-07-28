import { Router } from "express";
import { getEmployees } from "../controllers/employees/getEmployees";

const EmployeesRouter = Router();

EmployeesRouter.route("/").get(getEmployees);

export default EmployeesRouter;
