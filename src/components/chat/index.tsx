import React, { Component, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Log from "./Log";
import Input from "./Input";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Message } from "../../types";

const ChatLayout = styled("div")(({ theme }) => ({
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	padding: "1em",
	paddingTop: 0,
}));

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const prompt = `${formData.get("prompt")}`;
		event.currentTarget.reset();

		// add user message
		const userMessage: Message = {
			from: "user",
			id: uuidv4(),
			text: prompt.trim(),
			isLoading: false,
		};
		setMessages((prevMessages) => [...prevMessages, userMessage]);

		// add ai message with loading state
		const AIMessage: Message = {
			from: "ai",
			id: uuidv4(),
			text: "",
			isLoading: true,
		};
		setMessages((prevMessages) => [...prevMessages, AIMessage]);

		// get completion and update message
		setIsLoading(true);
		const completion = await getCompletion(prompt);
		if (completion) {
			AIMessage.text = completion;
			setMessages((prevMessages) => {
				const newMessages = prevMessages.map((message) => {
					if (message.id === AIMessage.id) {
						return {
							...message,
							text: completion,
							isLoading: false,
						};
					}
					return message;
				});
				return newMessages;
			});
		}
		setIsLoading(false);
	}

	return (
		<Container maxWidth="md">
			<ChatLayout>
				<Log messages={messages} />
				<Input isLoading={isLoading} onSubmit={handleSubmit} />
			</ChatLayout>
		</Container>
	);
}

async function getCompletion(prompt: string): Promise<string | null> {
	try {
		const params = new URLSearchParams({ prompt }).toString();
		const url = import.meta.env.DEV
			? "http://localhost:3000/getCompletion?" + params
			: import.meta.env.VITE_GET_COMPLETION_URL + "/?" + params;
		const result = await fetch(url);
		if (result.ok) {
			const data = await result.json();
			console.log(data);
			return data.result as string;
		} else {
			console.log("Something went wrong");
		}
	} catch (error) {
		console.log(JSON.stringify(error));
	}
	return null;
}
