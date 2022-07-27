import { Router } from "express";
import { authValidation } from "../config/authValidation";
import { registerUser } from "../controllers/auth/register";
import ROUTES from "./routes";

const AuthRouter = Router();

AuthRouter.post(ROUTES.AUTH.REGISTER, authValidation, registerUser);

export default AuthRouter;
