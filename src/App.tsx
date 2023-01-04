import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/400.css";
import "./index.css";
import Chat from "./components/chat";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Chat />
			</ThemeProvider>
		</div>
	);
}

export default App;
