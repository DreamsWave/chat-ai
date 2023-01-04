import React from "react";
import Message from "./Message";
import { styled } from "@mui/material/styles";
import { Message as MessageType } from "../../types";

const Layout = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	overflowY: "scroll",
	paddingBottom: "1em",
	marginRight: "-12px",
	paddingRight: "4px",
	"::-webkit-scrollbar": {
		width: "8px",
	},
	"::-webkit-scrollbar-track": {
		boxShadow: "nset 0 0 6px grey",
		borderRadius: "5px",
	},
	"::-webkit-scrollbar-thumb": {
		background: theme.palette.primary.light,
		borderRadius: "15px",
		height: "2px",
	},
	"::-webkit-scrollbar-thumb:hover": {
		background: theme.palette.primary.dark,
		maxHeight: "10px",
	},
}));

export default function Log({ messages }: { messages: MessageType[] }) {
	return (
		<Layout>
			{messages.map((message) => (
				<Message
					key={message.id}
					text={message.text}
					type={message.from}
				/>
			))}
		</Layout>
	);
}
