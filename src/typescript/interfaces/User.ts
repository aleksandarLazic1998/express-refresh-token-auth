import { IUserRoles } from "./Roles";

export interface IUser {
	email: string;
	password: string;
	roles: IUserRoles;
	refreshToken?: string[];
}
