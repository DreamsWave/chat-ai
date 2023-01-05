import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

type InputProps = {
	onSubmit: any;
	isLoading: boolean;
};

export default function Input({ onSubmit, isLoading = false }: InputProps) {
	return (
		<Paper
			component="form"
			elevation={24}
			sx={{
				p: "4px 8px",
				display: "flex",
				alignItems: "center",
				height: "fit-content",
				opacity: isLoading ? 0.3 : 1,
			}}
			onSubmit={onSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				autoFocus={isLoading}
				name="prompt"
				disabled={isLoading}
				autoComplete="off"
			/>
			<IconButton disabled={isLoading} type="submit" sx={{ p: "10px" }}>
				<SendIcon color="primary" />
			</IconButton>
		</Paper>
	);
}
