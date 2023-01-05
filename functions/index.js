const express = require("express");
const cors = require("cors");
const { handler } = require("./getCompletion");
const app = express();
const port = 3000;

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/getCompletion", async (req, res) => {
	const response = await handler({ queryStringParameters: req.query });
	// const response = await handler({ body: JSON.stringify(req.body) });
	if (response?.body) {
		res.json({ ...response.body });
	} else {
		res.send("Something wrong");
	}
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
