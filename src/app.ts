import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import ROUTES from "./routers/routes";
import AuthRouter from "./routers/auth";
import corsOptions from "./config/corsOptions";
import { jwtValidator } from "./middlewares/jwtValidator";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

/* Public Routes */
app.use(ROUTES.AUTH.URL, AuthRouter);

/* Private Routes */
app.use(jwtValidator);

export default app;
