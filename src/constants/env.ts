export const ENV_CONST = {
	PORT: process.env.PORT || 3006,
	ADMIN_ROLE: process.env.ADMIN_ROLE || 0,
	MANAGER_ROLE: process.env.MANAGER_ROLE || 0,
	USER_ROLE: process.env.USER_ROLE || 0,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
	MONGO_DB_URI: process.env.MONGO_DB_URI || "",
};
