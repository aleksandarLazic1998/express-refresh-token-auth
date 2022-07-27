import { IMessage } from "./Message";

export interface IJsonMessage {
	errors?: IMessage[] | string;
	message?: string;
}
