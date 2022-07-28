export const USER_ROLES = {
	Admin: process.env.ADMIN_ROLE || 0,
	Manager: process.env.MANAGER_ROLE || 0,
	User: process.env.USER_ROLE || 0,
};

export const isRoleAccepted = Object.values(USER_ROLES);
