import React, { Component, FormEvent, useState } from "react";
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

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const prompt = `${formData.get("prompt")}`;
		const text = await getCompletion(prompt);
		if (text) {
			const message: Message = {
				from: "ai",
				id: messages.length,
				text,
			};
			const newMessages = [...messages, message];
			setMessages(newMessages);
		}
	}

	return (
		<Container maxWidth="md">
			<ChatLayout>
				<Log messages={messages} />
				<Input onSubmit={handleSubmit} />
			</ChatLayout>
		</Container>
	);
}

async function getCompletion(prompt: string): Promise<string | null> {
	try {
		const result = await fetch(import.meta.env.VITE_GET_COMPLETION_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({ prompt }),
		});
		if (result.ok) {
			const text = await result.text();
			return text;
		} else {
			console.log("Something went wrong");
		}
	} catch (error) {
		console.log(JSON.stringify(error));
	}
	return null;
}
