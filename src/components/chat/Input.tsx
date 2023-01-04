import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export default function Input({ onSubmit }: { onSubmit: any }) {
	return (
		<Paper
			component="form"
			elevation={24}
			sx={{
				p: "4px 8px",
				display: "flex",
				alignItems: "center",
				height: "fit-content",
			}}
			onSubmit={onSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				autoFocus
				maxRows={5}
				name="prompt"
			/>
			<IconButton type="submit" sx={{ p: "10px" }}>
				<SendIcon />
			</IconButton>
		</Paper>
	);
}
