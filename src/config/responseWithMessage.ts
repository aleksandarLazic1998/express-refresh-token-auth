import { Response } from "express";
import { IJsonMessage } from "../typescript/interfaces/JsonMessage";
import { IMessage } from "../typescript/interfaces/Message";

interface IProps {
	res: Response;
	status: number;
	messages: IMessage[] | string;
	type: "error" | "sucess";
}

export const responseWithMessage = (props: IProps) => {
	const { res, status, messages, type } = props;

	const jsonMessage: IJsonMessage = {};

	if (type === "error" && messages === typeof String) {
		jsonMessage.errors = messages;
	} else if (type === "sucess" && messages === typeof String) {
		jsonMessage.message = messages;
	}

	return res.status(status).json(jsonMessage);
};
