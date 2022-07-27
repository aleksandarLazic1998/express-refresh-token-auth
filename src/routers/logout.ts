import { Router } from "express";
import { logoutUser } from "../controllers/auth/logoutUser";
import ROUTES from "./routes";

const LogoutRouter = Router();

LogoutRouter.delete(ROUTES.AUTH.LOGOUT, logoutUser);

export default LogoutRouter;
