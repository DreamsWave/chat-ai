import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Avatar, CircularProgress, Typography, useTheme } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

const MessageLayout = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "flex-end",
}));

const TextBox = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: theme.palette.text.secondary,
	padding: "1em 2em",
	marginTop: "1em",
	wordBreak: "break-word",
}));

type MessageProps = {
	type?: "user" | "ai";
	text: string;
	isLoading: boolean;
};

export default function Message({
	type = "user",
	text,
	isLoading = false,
}: MessageProps) {
	const theme = useTheme();
	return (
		<MessageLayout>
			<Avatar
				sx={{
					bgcolor:
						type === "user"
							? theme.palette.primary.main
							: theme.palette.secondary.main,
					marginRight: "0.5em",
				}}
			>
				{type === "user" && <PersonIcon />}
				{type === "ai" && <SmartToyIcon />}
			</Avatar>
			<TextBox elevation={type === "user" ? 2 : 12}>
				{isLoading ? (
					<CircularProgress size={15} />
				) : (
					<Typography variant="body1">{text}</Typography>
				)}
			</TextBox>
		</MessageLayout>
	);
}
