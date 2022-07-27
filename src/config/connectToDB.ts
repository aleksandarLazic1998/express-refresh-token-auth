import { Server } from "http";
import mongoose from "mongoose";
import { ENV_CONST } from "../constants/env";

export const connectToDB = async (server: Server) => {
	try {
		await mongoose.connect(ENV_CONST.MONGO_DB_URI);
		console.log("Connected To DB");

		server.listen(ENV_CONST.PORT, () =>
			console.log(`Listening on port: ${ENV_CONST.PORT}`)
		);
	} catch (error) {
		process.exit(1);
		console.log("Connection to Data Base failed.");
	}
};
