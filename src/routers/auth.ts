import { Router } from "express";
import { authValidation } from "../config/authValidation";
import { loginUser } from "../controllers/auth/loginUser";
import { logoutUser } from "../controllers/auth/logoutUser";
import { registerUser } from "../controllers/auth/register";
import ROUTES from "./routes";

const AuthRouter = Router();

AuthRouter.post(ROUTES.AUTH.REGISTER, authValidation(), registerUser);
AuthRouter.post(ROUTES.AUTH.LOGIN, authValidation(), loginUser);
AuthRouter.delete(ROUTES.AUTH.LOGOUT, logoutUser);

export default AuthRouter;
