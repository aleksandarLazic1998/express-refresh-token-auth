import { config } from "dotenv";
config();

import { createServer } from "http";
import app from "./app";

const PORT = process.env.PORT || 3006;
const server = createServer(app);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
