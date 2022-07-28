import { Router } from "express";
import { refreshToken } from "../controllers/refreshToken";

const RefreshTokenRouter = Router();

RefreshTokenRouter.get("/", refreshToken);

export default RefreshTokenRouter;
