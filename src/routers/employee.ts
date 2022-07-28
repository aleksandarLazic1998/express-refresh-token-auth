import { Router } from "express";
import { USER_ROLES } from "../constants/userRoles";
import { addEmployee } from "../controllers/employees/addEmployee";
import { deleteEmployee } from "../controllers/employees/deleteEmployee";
import { editEmployee } from "../controllers/employees/editEmployee";
import { getEmployees } from "../controllers/employees/getEmployees";
import { roleAuth } from "../middlewares/roleAuth";

const EmployeesRouter = Router();

EmployeesRouter.route("/").get(getEmployees).post(addEmployee);
EmployeesRouter.route("/:id")
	.post(roleAuth(USER_ROLES.Manager!, USER_ROLES.Admin!), editEmployee)
	.delete(roleAuth(USER_ROLES.Admin!), deleteEmployee);

export default EmployeesRouter;
