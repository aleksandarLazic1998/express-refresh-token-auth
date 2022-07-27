import { config } from "dotenv";
config();

import { createServer } from "http";
import app from "./app";
import { connectToDB } from "./config/connectToDB";

connectToDB(createServer(app));
