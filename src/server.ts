import { config } from "dotenv";
config();

import { createServer } from "http";
import app from "./app";
import { ENV_CONST } from "./constants/env";

const server = createServer(app);

server.listen(ENV_CONST.PORT, () =>
	console.log(`Listening on port: ${ENV_CONST.PORT}`)
);
