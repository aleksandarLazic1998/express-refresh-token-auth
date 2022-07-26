import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

export default app;
