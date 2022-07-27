import { Router } from "express";
import { authValidation } from "../config/authValidation";
import { loginUser } from "../controllers/auth/loginUser";
import { registerUser } from "../controllers/auth/register";
import ROUTES from "./routes";

const AuthRouter = Router();

AuthRouter.post(ROUTES.AUTH.REGISTER, authValidation(), registerUser);
AuthRouter.post(ROUTES.AUTH.LOGIN, authValidation(), loginUser);

export default AuthRouter;
